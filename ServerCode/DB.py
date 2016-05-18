import MySQLdb
import json
import hashlib
import uuid
import time
import calendar

import sys
import os

import random
import string
from User import User

from flask import current_app as app

class DB:
    def __init__(self):
        self.conn = MySQLdb.connect(host="localhost", user=app.config["DBUser"], passwd=app.config["DBPass"], db=app.config["DB"])
        self.cur = self.conn.cursor()

    @staticmethod
    def testConnection():
        db = DB()
        db.cur.execute("Select * FROM privacy_options")
        temp = []
        for row in db.cur:
            temp.append(row.__dict__)
	return temp

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
		print sys.exc_info()[0]
		return False

    @staticmethod
    def saveFile(userName, fileName, filePath, name, date, description, location,privacy, thumbFilePath):
	db = DB()
	hashValue = str(hashlib.sha256(fileName + userName + description + location + str(calendar.timegm(time.gmtime()))).hexdigest())
	sqlFile = """INSERT INTO Files (ownerName, fileName, filePath, privacyOption, hashValue, uploadedDate, thumbFilePath) VALUES (%s,%s,%s,%s,%s,%s, %s)"""
	db.cur.execute(sqlFile, (userName, fileName, filePath, privacy, hashValue, int(round(time.time() * 1000)), thumbFilePath ))
	fileId = db.cur.lastrowid
	sqlMetaData = """ INSERT INTO FilesToMetadata (fileId, metaDataOption, value) VALUES (%s, %s, %s)"""
	db.cur.execute(sqlMetaData, (fileId, 'Name', name)) 
        db.cur.execute(sqlMetaData, (fileId, 'Date', date)) 
        db.cur.execute(sqlMetaData, (fileId, 'Description', description)) 
        db.cur.execute(sqlMetaData, (fileId, 'Location', location)) 
	db.conn.commit()
	return "true"

    @staticmethod
    def genRandomString(N):
	return 	''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + " ") for _ in range(N))

    @staticmethod
    def retrieveFileDetails(userName, fileId):
	sql = "SELECT * from Files where hashValue = %s"
	result = DB.getOneResultWithParam(sql, (fileId))
	if (result is None):
		return {'status':"File not found"}
	metaData = DB.getAllResultsWithParams("Select * From FilesToMetadata WHERE fileId = %s",(result[0]))
	metaDataArr = {}	
	for row2 in metaData:
		metaDataArr[row2[2]] = row2[3]			
	return {'url':'retrieveFile/'+result[5], 'title':metaDataArr['Name'], 'eventDate':metaDataArr['Date'], 'location':metaDataArr['Location'], 'owner':result[1], 'description':metaDataArr['Description'], 'privacy':result[4], 'uploadedDate':result[6], 'hash':result[5], 'thumb':'retrieveThumb/' + result[5]}

    @staticmethod
    def getAllPersonsData(userName):
	#db = DB()
	publicList = DB.getAllResults("Select * FROM Files where privacyOption = 'public'")
	privateList = DB.getAllResultsWithParams("Select * FROM Files where privacyOption = 'private' and ownerName = %s",(userName))

	returnList = []	
	returnList = DB.getAllDataGeneric(publicList, returnList)
	returnList = DB.getAllDataGeneric(privateList, returnList)
	
	return returnList

    @staticmethod
    def getAllDataGeneric(fromList, fillList):
	for row in fromList:
		metaData = DB.getAllResultsWithParams("Select * From FilesToMetadata WHERE fileId = %s",(row[0]))
		metaDataArr = {}	
		for row2 in metaData:
			metaDataArr[row2[2]] = row2[3]			
		fillList.append({'url':'retrieveFile/'+row[5], 'title':metaDataArr['Name'], 'eventDate':metaDataArr['Date'], 'location':metaDataArr['Location'], 'owner':row[1], 'description':metaDataArr['Description'], 'privacy':row[4], 'uploadedDate':row[6], 'hash':row[5], 'thumb':'retrieveThumb/' + row[5]})
	return fillList

    @staticmethod
    def deleteFile(hashIn, sessionUser):
	#check if the session email equals the hashes owner username
	sql = "SELECT * FROM Files Where hashValue = %s"
	result = DB.getOneResultWithParam(sql,(hashIn))
	if(result[1] == sessionUser):
		try:
			os.remove(result[3] + "/" + result[2])
			os.remove(result[3] + "/" + result[7])
			sqlDelete = "DElete from Files Where id = %s"
			resultDelete = DB.executeWithParms(sqlDelete, (result[0]))
			return "Success"
		except OSError as e:
			return "No Such file"

	return "Not Authorized to delete this file"
	#if so then delete from the system
	#then delete from data base

	#no matter what return a status

    @staticmethod
    def checkFileAuth(user,fileIdIn):
	sql = "SELECT * FROM Files where hashValue = %s"
	result = DB.getOneResultWithParam(sql, (fileIdIn))
	if(not result):
		return True, "", ""
	if (result[4] == 'public'):
		return True, result[2], result[1], result[7] #auth, fileName, owner, thumb
	else: #its a private file. only return true is the person asking for it is the owner
		return result[1] == user, result[2], result[1], result[7]

    @staticmethod
    def getPersonDetails(user):
	sql = "Select userName, email, name from Users where userName = %s"
	result = DB.getOneResultWithParam(sql, user)
	if (result is not None):
		return {'userName':result[0], 'email':result[1], 'name':result[2]}
	return {'error':result, 'input':email}

    @staticmethod
    def updatePersonDetails(userName, data):
	auth = DB.login(userName, data['password'])
	if(auth == True):
		#make the change
		sql = "Update Users SET email = %s, name = %s WHERE userName = %s"
		result = DB.executeWithParms(sql,(data['email'], data['fName'], data['userName']))
		return 'success'
	else:
		return "No authorized"

    @staticmethod
    def updatePassword(username, data):
	auth = DB.login(username, data['oldPassword'])
	if(auth == True):       
		#db = DB()
		salt = str(uuid.uuid4())
		password = str(hashlib.sha256(data['newPassword'] + salt).hexdigest())
		sql = "UPDATE Users set pass = %s,salt = %s WHERE userName = %s"
		DB.executeWithParms(sql, (password, salt, username))				
		return True
	else:
		return False

    @staticmethod
    def getAllResults(SQL):
        db = DB()
        db.cur.execute(SQL)
        return db.cur.fetchall()

    @staticmethod
    def getAllResultsWithParams(SQL, params):
        db = DB()
        db.cur.execute(SQL, params)
        return db.cur.fetchall()
        
    @staticmethod
    def getOneResult(SQL):
        db = DB()
        db.cur.execute(SQL)
        return db.cur.fetchone()

    @staticmethod
    def getOneResultWithParam(SQL, param):
        db = DB()
        db.cur.execute(SQL, param)
        return db.cur.fetchone()
    
    @staticmethod    
    def execute(SQL):
        db = DB()
        db.cur.execute(SQL)
        db.conn.commit()

    @staticmethod    
    def executeWithParms(SQL, params):
        db = DB()
        db.cur.execute(SQL, params)
        db.conn.commit()

