import os
import sys
import json
import hashlib
import uuid
import time
import calendar
from DB import DB

class FileManager:

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
