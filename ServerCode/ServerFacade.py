from User import User
from FileManager import FileManager


class ServerFacade:

	def login(self, userName, password):
		return User.login(userName, password)
	def register(self, userName, password, email, fName):
		return User.register(userName,password,email, fName)
	def saveFile(self, userName, fileName, filePath, name, date, description, location,privacy,thumbFilePath):
		return FileManager.saveFile(userName, fileName, filePath,  name, date, description, location,privacy, thumbFilePath)
	def getData(self, userName):
		return User.getAllPersonsData(userName)
	def retrieveFileDetails(self, userName, fileId):
		return FileManager.retrieveFileDetails(userName, fileId)
	def checkFileAuth(self,user,fileIdIn):
		return FileManager.checkFileAuth(user,fileIdIn)
	def deletePic(self, hashIn, sessionUser):
		return FileManager.deleteFile(hashIn, sessionUser)
	def getPersonDetails(self, user):
		return User.getPersonDetails(user)
	def updatePersonDetails(self, userName, data):
		return User.updatePersonDetails(userName, data)
	def updatePassword(self, userName, data):
		return User.updatePassword(userName, data)
