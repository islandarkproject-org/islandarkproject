

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
