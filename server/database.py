import mysql.connector
import sys

from dnf.exceptions import DatabaseError


class DBHelper:

    def __init__(self):
        try:
            self.conn = mysql.connector.connect(host='localhost',
                                                user='root',
                                                password='',
                                                database='Hackathon DU')
            self.cursor = self.conn.cursor()
        except DatabaseError:
            sys.exit('Could not connect to database')
        else:
            print('Connected to database successfully')


