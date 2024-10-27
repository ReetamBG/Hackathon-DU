
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/login', method=['POST'])
def login():
    return 'Hello'


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)