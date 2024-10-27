import mysql.connector
import sys
from mysql.connector import Error

class DBHelper:

    def __init__(self):
        try:
            self.conn = mysql.connector.connect(host='localhost',
                                                user='root',
                                                password='',
                                                database='Hackathon DU')
            self.cursor = self.conn.cursor()
        except Error as e:
            sys.exit(f'Could not connect to database: {e}')
        else:
            print('Connected to database successfully')

    def signup(self, name, password, email, accountType):
        try:
            query = """
            INSERT INTO users (user_id, name, email, password, user_type)
            VALUES (NULL, %s, %s, %s, %s)
            """

            self.cursor.execute(query, (name, email, password, accountType))
            self.conn.commit()
            print("User added successfully")
        except Error as e:
            print(f"An error occurred: {e}")
            self.conn.rollback()




    def close_connection(self):
        self.cursor.close()
        self.conn.close()
        print("Database connection closed.")
