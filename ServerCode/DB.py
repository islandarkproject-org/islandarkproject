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

from flask import current_app as app

class DB:
    def __init__(self):
        self.conn = MySQLdb.connect(host="localhost", user=app.config["DBUser"], passwd=app.config["DBPass"], db=app.config["DB"])
        self.cur = self.conn.cursor()

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

