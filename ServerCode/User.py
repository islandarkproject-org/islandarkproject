import hashlib
import uuid
import sys
from DB import DB
from FileManager import FileManager

class User:
	def __init__(self, id, userName, passIn, salt, email, fName):
		self.id = id
		self.userName = userName
		self.passWord = passIn
		self.salt = salt
		self.email = email
		self.fName = fName

	def __init__(self, row):
		self.id = row[0]
		self.userName = row[1]
		self.passWord = row[2]
		self.salt = row[3]
		self.email = row[4]
		self.fname = row[5]

	@staticmethod
	def login(userNameIn, passWord):
		db = DB()
		db.cur.execute("""Select * FROM Users WHERE userName = %s""", (userNameIn,))
		dbResult = db.cur.fetchone()
		if(dbResult == None):
			return False
		user = User(dbResult)
		return str(hashlib.sha256(passWord + user.salt).hexdigest()) == user.passWord

	@staticmethod
	def register(userName, passWord, email, fName):
		#check if user already exists
		try:        
			db = DB()
			salt = str(uuid.uuid4())
			password = str(hashlib.sha256(passWord + salt).hexdigest())
			db.cur.execute("""Insert into Users (userName,pass,salt,email,name) VALUES (%s,%s,%s,%s,%s)""", (userName,password,salt,email,fName))
			db.conn.commit()	
			return True
		except:
			print "THE ERROR "
			print sys.exc_info()
			return False

	@staticmethod #used only to clean up after automated tests
	def deleteUser(username):
		sql = "Delete from Users where userName = %s"
		DB.executeWithParms(sql, (username))
		return "true"

	@staticmethod
	def getAllPersonsData(userName):
		#db = DB()
		publicList = DB.getAllResults("Select * FROM Files where privacyOption = 'public'")
		privateList = DB.getAllResultsWithParams("Select * FROM Files where privacyOption = 'private' and ownerName = %s",(userName))

		returnList = []	
		returnList = FileManager.getAllDataGeneric(publicList, returnList)
		returnList = FileManager.getAllDataGeneric(privateList, returnList)
	
		return returnList

	@staticmethod
	def getPersonDetails(user):
		sql = "Select userName, email, name from Users where userName = %s"
		result = DB.getOneResultWithParam(sql, user)
		if (result is not None):
			return {'userName':result[0], 'email':result[1], 'name':result[2]}
		return {'error':result, 'input':email}

	@staticmethod
	def updatePersonDetails(userName, data):
		auth = User.login(userName, data['password'])
		if(auth == True):
			#make the change
			sql = "Update Users SET email = %s, name = %s WHERE userName = %s"
			result = DB.executeWithParms(sql,(data['email'], data['fName'], data['userName']))
			return 'success'
		else:
			return "No authorized"

	@staticmethod
	def updatePassword(username, data):
		auth = User.login(username, data['oldPassword'])
		if(auth == True):       
			#db = DB()
			salt = str(uuid.uuid4())
			password = str(hashlib.sha256(data['newPassword'] + salt).hexdigest())
			sql = "UPDATE Users set pass = %s,salt = %s WHERE userName = %s"
			DB.executeWithParms(sql, (password, salt, username))				
			return True
		else:
			return False
