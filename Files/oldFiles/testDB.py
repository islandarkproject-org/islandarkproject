import random
import sys
import TasksDAO
import json


def addUser(jsonInput):
	temp = TasksDAO.DB()
	try:
		email = jsonInput["email"]
		password = jsonInput["password"]
		firstName = jsonInput["firstName"]
		lastName = jsonInput["lastName"]
		#create salt, add that to addUser, concate it to password and encrypt
		temp.addUser(email,password,firstName,lastName)
		return json.dumps({'status':"success"})
	except ValueError, e:
		#write error to file, return nicer string
		return json.dumps({'status':"error", 'data':str(e)})

def addList(jsonInput):
	temp = TasksDAO.DB()
	try:
		email = jsonInput["email"]
		listName = jsonInput["listName"]
		temp.addList(email, listName)
		return json.dumps({'status':"success"})
	except Exception, e:
		#write error to file, return nicer string
		return json.dumps({'status':"error", 'data':str(e)})

def deleteList(jsonInput):
	temp = TasksDAO.DB()
	try:
		email = jsonInput["email"]
		listName = jsonInput["listName"]
		temp.deleteList(email, listName)
		return json.dumps({'status':"success"})
	except Exception, e:
		#write error to file, return nicer string
		return json.dumps({'status':"error", 'data':str(e)})

def addTask(jsonInput):
	temp = TasksDAO.DB()
	try:
		email = jsonInput["email"]
		listName = jsonInput["listName"]
		task = jsonInput["task"]
		#verify this user can add to thisNEW.id list
		temp.addTask(email, listName, task)
		return json.dumps({'status':'success'})
	except Exception, e:
		#write error to file, return nicer string
		return json.dumps({'status':"error", 'data':str(e)})

def deleteTask(jsonInput):
	temp = TasksDAO.DB()
	try:
		temp.deleteTask(email, task)
		return json.dumps({'status':'success'})
	except Exception, e:
		#write error to file, return nicer string
		return json.dumps({'status':"error", 'data':str(e)})	

def getTasks(jsonInput):
	temp = TasksDAO.DB()
	try:
		email = jsonInput["email"]
		return json.dumps({'status':"success", 'data':temp.getTasks(email)})
	except Exception, e:
		#write error to file, return nicer string
		return json.dumps({'status':"error", 'data':str(e)})

def getLists(jsonInput):
	temp = TasksDAO.DB()
	try:
		email = jsonInput["email"]
		return {'status':"success", 'data':temp.getLists(email)}
	except Exception, e:
		#write error to file, return nicer string
		return {'status':"error", 'data':str(e)}

def getData(jsonInput):
	temp = TasksDAO.DB()
	try:
		email = jsonInput["email"]
		#verify email first
		return {'status':"success", 'data':temp.getData(email)}, temp.getUserDetails(email)
	except Exception, e:
		#write error to file, return nicer string
		return {'status':"error", 'data':str(e)}

def getSharees(email):
	temp = TasksDAO.DB()
	try:
		return temp.getSharees(email)
	except Exception, e:
		#write error to file, return nicer string
		return {'status':"error", 'data':str(e)}

def syncDeltas(jsonInput):
	temp = TasksDAO.DB()
	try:
		email = jsonInput["email"]
		addedDelta = jsonInput["addedDelta"]
		deleteDelta = jsonInput["deleteDelta"]
		status = temp.syncDeltas(email, addedDelta, deleteDelta)
	except Exception, e:
		status = {'status':"error " + str(e), 'newestListId':-1}
	return status

def validateUser(email,password):
	temp = TasksDAO.DB()
	return temp.validateUser(email,password)

def registerUser(jsonData):
	temp = TasksDAO.DB()
	return temp.registerUser(jsonData["email"].lower(), jsonData["password"], jsonData["firstName"], jsonData["lastName"])
	
	

if __name__ == "__main__":
	while (True):
		print "1 to add User"
		print "2 to add List"
		print "3 to add task"
		print "4 to get tasks"
		print "5 to get lists"
		print "6 to delete a list"
		print "7 to delete a task"
		print "0 to quit"
		var = raw_input()
		var = int(var)
		if(var <= 0):
			exit()	
		elif(var == 1):
			email = raw_input("Enter email: ")
			password = raw_input("Enter password: ")
			firstName = raw_input("Enter first name: ")
			lastName = raw_input("Enter last name: ")
			temp = {'email':email, 'password':password, 'firstName':firstName, 'lastName':lastName}
			print addUser(temp)
		elif(var == 2):
			email = raw_input("email ")
			listName = raw_input("listName ")
			print addList({'email':email, 'listName':listName})
		elif(var == 3):
			email = raw_input("email ")
			listName = raw_input("listName ")
			task = raw_input("task ")
			print addTask({'email':email, 'listName':listName, 'task':task})
		elif(var == 4):
			print getTasks()
		elif(var == 5):
			email = raw_input("email ")
			print getLists({'email':email})
		elif(var == 6):
			print deleteList()
		elif(var == 7):
			email = raw_input("email ")
			task = raw_input("taskId ")
			print deleteTask({'email':email, 'task': task})
