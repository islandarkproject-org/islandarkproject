from DB import DB


class ServerFacade:

	def testDB(self):
		return DB.testConnection()

	def login(self, userName, password):
		return DB.login(userName, password)
	def register(self, userName, password, email, fName):
		return DB.register(userName,password,email, fName)
	def saveFile(self, userName, fileName, filePath, name, date, description, location,privacy,thumbFilePath):
		return DB.saveFile(userName, fileName, filePath,  name, date, description, location,privacy, thumbFilePath)
	def getData(self, userName):
		return DB.getAllPersonsData(userName)
	def retrieveFileDetails(self, userName, fileId):
		return DB.retrieveFileDetails(userName, fileId)
	def checkFileAuth(self,user,fileIdIn):
		return DB.checkFileAuth(user,fileIdIn)
	def deletePic(self, hashIn, sessionUser):
		return DB.deleteFile(hashIn, sessionUser)
	def getPersonDetails(self, user):
		return DB.getPersonDetails(user)
	def updatePersonDetails(self, userName, data):
		return DB.updatePersonDetails(userName, data)
	def updatePassword(self, userName, data):
		return DB.updatePassword(userName, data)
