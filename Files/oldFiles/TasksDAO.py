import sqlite3
from EnumResponses import *
import json
import hashlib
import uuid
import sys
sys.path.insert(0, '/var/www/ListManager_beta/ListManagerFiles/Files/')
class DB:
	def __init__(self):
		#self.conn = sqlite3.connect("tasksDB.sqlite")
		self.conn = sqlite3.connect("/var/www/ListManager_beta/ListManagerFiles/Files/tasksDB.sqlite")

		self.conn.execute('pragma foreign_keys=ON')

#depricated
	def addUser(self, email, password, firstName, lastName):	
		c = self.conn.cursor()

		rows = c.execute("Select COUNT(*) From Users where email = ?",(email,))
		rows = rows.fetchone()
		if(rows[0] < 1):
			c.executemany("Insert into Users (email,password,firstName,lastName) VALUES(?,?,?,?)",[(email,password,firstName,lastName),])

			self.conn.commit()
		else:
			raise ValueError("That email address is already registered")
		self.conn.close()

	def addList(self, email, listName):
		c = self.conn.cursor()
		try:	
			owner_id = getEmailId(c, email)
			c.execute("Insert Into Lists (FK_user_id, listName) VALUES(?,?)", (owner_id, listName))
			self.conn.commit()
		except ValueError, e:
			raise ValueError(str(e))
		finally:
			self.conn.close()

	def updateList(self, email,listId,name):
		c = self.conn.cursor()
		try:
			owner_id = getEmailId(c, email)
			if(validateOwnerIdCanEditList(c, owner_id, listId)):
				c.execute("Update Lists set listName = ? where id = ?", (name, listId))
				self.conn.commit()
		except ValueError, e:
			raise ValueError(str(e))
		finally:
			self.conn.close()


	def deleteList(self, email, listName):
		c = self.conn.cursor()
		try:
			owner_id = getEmailId(c, email)
			if(validateOwnerIdCanEditList(c, owner_id, getListDetails(c,listName)["id"])):
				c.execute("Delete from Lists where FK_user_id = ? and listName = ?", (owner_id, listName))
				self.conn.commit()
		except ValueError, e:
			raise ValueError(str(e))
		finally:
			self.conn.close()

	def addTask(self, email, listName, task):
		c = self.conn.cursor()
		try:
			email_id = getEmailId(c, email)
			list_id = c.execute("Select id from Lists where FK_user_id = ? and listName = ?", (email_id, listName))	
			list_id = list_id.fetchone()
			#verify that user can modify the list
			if(list_id == None):
				raise ValueError("That supplied list doesn't exist")
			else:
				list_id = list_id[0]
				c.execute("Insert Into Tasks (FK_list_id, owner_id, task, status) VALUES (?,?,?,?)", (list_id, email_id,task,'false'))
				self.conn.commit()
				
		except ValueError, e:
			raise ValueError(str(e))
		finally:
			self.conn.close()

	def deleteTask(self, email, task_id):
		c = self.conn.cursor()
		try:
			email_id = getEmailId(c, email)
			list_id = c.execute("Delete from Tasks where id = ? and owner_id = ?", (task_id, email_id))	
			self.conn.commit()	
		except ValueError, e:
			raise ValueError(str(e))
		finally:
			self.conn.close()

	def getTasks(self, email):
		c = self.conn.cursor()
		owner_id = getEmailId(c,email)	
		tasks = []
		return [{'status':"get Tasks DAO"}]
		if(owner_id > 0):
			for row in c.execute("Select * FROM Tasks where owner_id = ?",(owner_id,)):
				listDetails = getListDetails(c, row[1])
				tasks.append({'task':row[3], 'listDetails':listDetails, 'status':row[4]})
		return tasks

	def getLists(self, email):
		c = self.conn.cursor()
		owner_id = getEmailId(c,email)	
		lists = []
		if(owner_id > 0):
			lists.extend(getListsForUser(c,owner_id))
			lists.extend(getListsSharedWithUser(c, owner_id))
		return lists

	def getData(self, email):
		c = self.conn.cursor()
		user_id = getEmailId(c, email)
		myLists = getListsForUser(c, user_id)
		lists = []
		for row in myLists:
			row["tasks"] = getTasksInList(c, row["id"])
			lists.append(row)
		sharedLists = getListsSharedWithUser(c,user_id)
		for row in sharedLists:
			row["tasks"] = getTasksInList(c, row["id"])
			lists.append(row)
		return lists

	def getSharees(self, email):
		c = self.conn.cursor()
		#this is just to double check this person has a log in here
		try:
			temp = []
			user_id = getEmailId(c,email)
			rows = c.execute("Select email from Users")
			rows = rows.fetchall()
			for row in rows:
				if(row[0] != email):
					temp.append(row[0])
			return temp
		except ValueError, e:
			raise ValueError(str(e))
		finally:
			self.conn.close()
			

	def syncDeltas(self, email, addedDelta, deleteDelta):		
		self.conn.isolation_level = None		
		c = self.conn.cursor()
		try:
			user_id = getEmailId(c,email)

			listsToAdd = addedDelta["lists"]
			listsToDelete = deleteDelta["lists"]
			syncLists(c,user_id,listsToAdd,listsToDelete)
				
			tasksToAdd = addedDelta["tasks"]
			tasksToDelete = deleteDelta["tasks"]
			syncTasks(c, user_id, tasksToAdd, tasksToDelete)

			sharesToAdd = addedDelta["shares"]
			sharesToUnFollow = deleteDelta["shares"]
			syncShares(c, user_id, sharesToAdd, sharesToUnFollow)

			lastId = -1
			if(len(listsToAdd) > 0):
				lastId = c.execute("Select id from Lists where FK_user_id = ? order by id desc",(user_id,))
				lastId = lastId.fetchone()
				lastId = lastId[0]	

			self.conn.commit()
		except ValueError, e:
			self.conn.rollback()
			raise ValueError(str(e))
		finally:
			self.conn.close()
		return {'status':'success', 'newestListId':lastId}

	def validateUser(self,email,password):
		c = self.conn.cursor()
		results = c.execute("Select password,salt from users where email = ?", (email,))
		intel = results.fetchone()
		if(intel == None):
			return MyResponses.not_valid_email
		else:
			salt = intel[1]
			hashed = str(hash(password + salt))
			if(hashed == intel[0]):
				return MyResponses.success
			else:
				return MyResponses.not_valid_password

	def registerUser(self, email, password, firstName, lastName):
		c = self.conn.cursor()
		findDub = c.execute("Select COUNT(*) From users where email = ?", (email,))
		findDub = findDub.fetchone()
		if(findDub[0] <= 0):
			#add it
			salt = str(uuid.uuid4())
			password = str(hash(password + salt))
			c.executemany("Insert into Users (email,password,firstName,lastName,salt) VALUES(?,?,?,?,?)",[(email,password,firstName,lastName,salt),])

			self.conn.commit()
			self.conn.close()
			return "success"
		else:
			self.conn.close()
			return "That user name is not available"

	def getUserDetails(self,email):
		c = self.conn.cursor()
		results = c.execute("Select firstName, lastName from Users where email = ?",(email,))
		results = results.fetchone()
		if(results == None):
			return "No user found"
		else:
			return results[0],results[1]

def syncLists(c,user_id,listsToAdd, listsToDelete):
			for listName in listsToAdd:
				c.execute("Insert Into Lists (FK_user_id, listName) VALUES (?,?)", (user_id, str(listName)))					
	
			for listId in listsToDelete:
				c.execute("Delete from Lists Where FK_user_id = ? and id = ?", (user_id, listId))

def syncTasks(c, user_id, tasksToAdd, tasksToDelete):
	for i in range(0,len(tasksToAdd)):
		#verify they can edit the listId (not listName) and then as the FK enter the listId
		if(validateUserIdCanEdit(c, user_id,tasksToAdd[i]["listId"])):
			c.execute("Insert Into Tasks (FK_list_id, owner_id, task, status) VALUES (?,?,?,?)", (tasksToAdd[i]["listId"], user_id,tasksToAdd[i]["name"],tasksToAdd[i]["status"]))
	

	for i in range(0,len(tasksToDelete)):
		if(validateUserIdCanEdit(c, user_id,tasksToDelete[i]["listId"])):
			c.execute("Delete from Tasks Where FK_list_id = ? and id = ?", (tasksToDelete[i]["listId"],tasksToDelete[i]["taskID"]))

def syncShares(c, user_id, sharesToAdd, sharesToUnFollow):
	for unfollow in sharesToUnFollow:
		c.execute("Delete from Shares where FK_lists_id = ? and FK_shared_user_id = ?",(unfollow,user_id))	
	for share in sharesToAdd:
		#return json.dumps(share)
		rows = share["rows"]
		listId = share["listId"]
		c.execute("Delete from Shares where FK_lists_id = ?", (listId,))
		for row in rows:
			c.execute("Insert into Shares (FK_lists_id, FK_shared_user_id, permissions) VALUES (?,?,?)",(listId,getEmailId(c,row["email"]),row["role"]))


def verifyAndGetListIdAndEmailId(c,email, listName):
	email_id = getEmailId(c, email)
	list_id = c.execute("Select id from Lists where FK_user_id = ? and listName = ?", (email_id, listName))	
	list_id = list_id.fetchone()
	#verify that user can modify the list
	if(list_id == None):
		raise ValueError("That supplied list doesn't exist")
	else:
		list_id = list_id[0]
		return list_id,email_id

def validateUserIdCanEdit(c,userId, listId):
	owner = c.execute("Select * from Lists where id = ? and FK_user_id = ?", (listId, userId))
	owner = owner.fetchone()
	if(owner != None):
		return True
	else:
		shared = c.execute("Select * from Shares where FK_lists_id = ? and FK_shared_user_id = ? and permissions = 'edit'", (listId,userId))
		shared = shared.fetchone()
		if(shared == None):
			return False
		return True	

def validateOwnerIdCanEditList(c, owner_id, listId):
	name = c.execute("Select * from Lists where id = ? and FK_user_id = ?", (listID,owner_id))
	name = name.fetchone()
	if(name == None):
		raise ValueError("Not authorized to edit this list")
	return True

def getTasksInList(c, listId):
	tasks = []
	rows = c.execute("Select id,task,status from Tasks where FK_list_id = ?",(listId,))
	rows = rows.fetchall()	
	for row in rows:
		if(row[2] == "true"):
			status = True
		else:
			status = False		
		obj = {'id':row[0], 'name':row[1], 'status':status}
		tasks.append(obj)
	return tasks

def getListsForUser(c, userId):
	temp = []
	rows = c.execute("Select * from Lists where FK_user_id = ? order by id desc", (userId,))
	rows = rows.fetchall()
	for row in rows:
		temp.append({'id':row[0], 'name' : row[2], 'owner' : getEmailFromID(c, userId), 'last_modified' : row[3], 'sharedWith' : getSharesOfList(c, row[0]), 'role':"owner"})
	
	return temp

def getListsSharedWithUser(c, userId):
	sharedLists = []
	rows = c.execute("Select FK_lists_id, permissions from Shares where FK_shared_user_id = ?", (userId,))
	rows = rows.fetchall()	
	for row in rows:
		obj = getListDetails(c, row[0])
		obj["role"] = row[1]	
		sharedLists.append(obj)
	return sharedLists

def getListDetails(c, listID):
	name = c.execute("Select * from Lists where id = ?", (listID,))
	name = name.fetchone()
	if(name == None):
		raise ValueError("No List name found")
	return {"id": name[0], 'name' : name[2], 'owner' : getEmailFromID(c, name[1]), 'last_modified' : name[3], 'sharedWith' : getSharesOfList(c, listID)}

def getSharesOfList(c, listId):
	sharees = []
	rows = c.execute("Select * from Shares where FK_lists_id = ?", (listId,))
	rows = rows.fetchall()
	for row in rows:
		sharees.append({'email':getEmailFromID(c, row[2]), 'role':row[3]})
	return sharees
	

def getEmailId(c, email):
	owner_id = c.execute("Select id from Users where email = ?", [(email),])
	owner_id = owner_id.fetchone()
	if (owner_id == None):
		raise ValueError("The supplied email " + email + " was not found")
	owner_id = owner_id[0]
	return owner_id

def getEmailFromID(c, userId):
	email = c.execute("Select email from Users where id = ?", [(userId),])
	email = email.fetchone()
	if (email == None):
		raise ValueError("The supplied emailID was not found")
	email = email[0]
	return email
