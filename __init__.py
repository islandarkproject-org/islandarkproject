import sys
import os
from functools import wraps
from flask import *
import json
from werkzeug import secure_filename
from PIL import Image
import glob


ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)

rootFolder = os.path.dirname(os.path.realpath(__file__))
app.template_folder= rootFolder + '/Files/'
filesPath = rootFolder + '/Files'
UPLOAD_FOLDER = rootFolder + '/Files/userFiles'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
sys.path.insert(0, rootFolder + '/ServerCode')
sys.path.insert(0, filesPath)

from ServerFacade import *

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

def check_auth(user, password):
	#value will acutaly be a random identifing token created when logged in and stored in DB. it will only be good
	#for 24 hours then it wont be good. 
	if session.has_key('value'): #add check that user is value in session
		return True
	else:
		return False

#def authenticate():
#    """Sends a 401 response that enables basic auth"""
#    return Response(
#    'Could not verify your access level for that URL.\n'
#    'You have to login with proper credentials', 401,
#    {'WWW-Authenticate': 'Basic realm="Login Required"'})
#	if session.has_key('value'):
#		return True
#	else:
# as 		return False


#def requires_auth(f):
#    @wraps(f)
#    def decorated(*args, **kwargs):
#        auth = request.authorization
#        if not auth or not check_auth(auth.username, auth.password):
#            return authenticate()
#        return f(*args, **kwargs)
#    return decorated


@app.route("/")
def index():
	return render_template('main.html')	
	#return send_from_directory(filesPath,'main.html')
		
@app.route("/retrieveFileDetails/<fileIdIn>")
def getFileDetails(fileIdIn):
	serverFacade = ServerFacade()
	result = serverFacade.retrieveFileDetails(session['value'],fileIdIn)
	return json.dumps(result)

@app.route("/retrieveThumb/<fileIdIn>")
def getThumb(fileIdIn):
	serverFacade = ServerFacade()
	result, fileName, owner, thumb = serverFacade.checkFileAuth(session['value'],fileIdIn)
	if(result == True): 
		#if file not exist deal with it correctly
		return send_from_directory(filesPath + "/userFiles/"+owner,thumb)
	else:
		return "Not Authorized"

@app.route("/retrieveFile/<fileIdIn>")
def getFile(fileIdIn):
	serverFacade = ServerFacade()
	result, fileName, owner,thumb = serverFacade.checkFileAuth(session['value'],fileIdIn)
	if(result == True): 
		#if file not exist deal with it correctly
		return send_from_directory(filesPath + "/userFiles/"+owner,fileName)
	else:
		return "Not Authorized"

@app.route("/uploadFile", methods=['GET','POST'])
def upload():
        if(check_auth("NONE", "GOG") == True):
            #return json.dumps({'status':'here'})
	    file = request.files['file']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                filename = filename.rstrip()
                if not os.path.exists(app.config['UPLOAD_FOLDER'] + '/' + session['value']):
                    os.makedirs(app.config['UPLOAD_FOLDER'] + '/' + session['value'])
                #find if this filename already exists and rename it if needs be. 
                i = 1
                savedFileName = filename
                while os.path.exists(app.config['UPLOAD_FOLDER'] + '/' + session['value'] + '/' + filename):
                    filename = savedFileName.rsplit('.',1)
                    extension = filename[1]
                    filename = filename[0]
                    filename = filename + "(" + str(i) + ")" + '.' + extension
                    i = i + 1

                file.save(os.path.join(app.config['UPLOAD_FOLDER'] + '/' + session['value'], filename))
		#create the thumb name for the thing now
                size = 128, 128

                infile = app.config['UPLOAD_FOLDER'] + '/' + session['value'] + '/' + filename
                file, ext = os.path.splitext(infile)
                im = Image.open(infile)
                im.thumbnail(size)
                thumbFilePath = file + ".thumbnail" + ext
                extAr = ext.split('.')
                im.save(thumbFilePath)
                thumbFile = thumbFilePath.rsplit('/',1)[1]		

                name = request.form['name']
                date = request.form['date']
                description = request.form['description']
                location = request.form['location']
                privacy = request.form['privacy']
                #save the meta data to the database
                serverFacade = ServerFacade()
		serverFacade.saveFile(session['value'],filename, app.config['UPLOAD_FOLDER'] + '/' + session['value'], name, date, description, location,privacy, thumbFile)
                return json.dumps({'status':'success', 'other':privacy, 'session':session['value']})
        else:
            return json.dumps({'status':"notAuth"})

def errorPage(error):
	return Response("An internal Error has occurred", 500)

@app.route("/getData", methods=['GET'])
def getData():
	serverFacade = ServerFacade()
	data = serverFacade.getData(session['value'])
	return Response(json.dumps({'status':'success', 'data':data}),  mimetype='application/json')

@app.route('/deletePic/<hashIn>', methods=['GET'])
def deletePic(hashIn):
	serverFacade = ServerFacade()
	return json.dumps({'status':serverFacade.deletePic(hashIn, session['value'])})

@app.route("/login", methods=['POST'])
def login():
	data = request.get_json()
	userName = data['userName'].lower()
	password = data['password']
	serverFacade = ServerFacade()
	
	if(serverFacade.login(userName, password)):
		session['value'] = userName.lower()
		return json.dumps({'status':"success"})
	else:
		return json.dumps({'status':"notAuth"})


@app.route("/register", methods=['POST'])
def register():
	data = request.get_json()
	serverFacade = ServerFacade()
	#check is pass and passValidate are the same, double check
	if(serverFacade.register(data["userName"], data["password"], data["email"], data["fName"])):
		#create folder in userFiles named the usernames
		session['value'] = data["userName"].lower()	
		return json.dumps({'status':'success'})
	else:
		return json.dumps({'status':'error', 'data':'User name or email already registered'})	
	#status = registerUser(data)
	#if(status == "success"):
	#	session['value'] = data['email'].lower()
	#	return json.dumps({'status':"success"}) 
	#else:
	#	return authenticate1(status)
		

@app.route("/verify", methods=['GET'])
def verify():
	temp = check_auth("NONCE", "GUFL")
	return json.dumps({'status':temp}) 

@app.route("/logout")
def logout():
	session.pop('value', None)
	session["__invalidate__"] = True
	return "true"#return send_from_directory(rootFolder,"logout.html")

@app.after_request
def removeCookie(response):
	if"__invalidate__" in session:
		response.delete_cookie(app.session_cookie_name)
	return response

@app.route("/getBios")
def getBios():
	from theTeam import *
	temp = theTeam
	#return jsonify(temp)
	return json.dumps(temp)

@app.route("/getSession", methods=['GET','POST'])
def getSession():
	if not session.has_key('value'): 
		return "Session value not set."
	else:
		return "Session value set to: " + str(session['value'])

@app.route("/getPersonDetails")
def getPersonDetails():
	if(not session.has_key('value')):
		return json.dumps({'status':'Not logged in'})
	serverFacade = ServerFacade()
	return json.dumps(serverFacade.getPersonDetails(session['value']))

@app.route("/updatePersonDetails", methods=['POST'])
def updatePersonDetails():
	if(not session.has_key('value')):
		return json.dumps({'status':'Not logged in'})
	data = request.get_json()
	#return json.dumps({'status':'updatePersonDetails', 'data':data})
	serverFacade = ServerFacade()
	return json.dumps({'status':serverFacade.updatePersonDetails(session['value'], data)})

@app.route("/updatePassword", methods=['POST'])
def updatePassword():
	if(not session.has_key('value')):
		return json.dumps({'status':'Not logged in'})
	data = request.get_json()
	#return json.dumps({'status':'updatePassword', 'data':data})
	serverFacade = ServerFacade()
	return json.dumps({'status':serverFacade.updatePassword(session['value'], data)})

@app.route("/test")
def test():
	#return 'hey'
	#myServerFacade = ServerFacade()
	return json.dumps(testDB())


if __name__ == "__main__":
	first = rootFolder + 'server.crt'
	second = rootFolder + 'server.key'
	app.run('0.0.0.0',debug=True)#, ssl_context=(first,second))

