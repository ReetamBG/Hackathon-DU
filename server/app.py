from flask import Flask
from flask_cors import CORS
from auth import auth_bp  # Import the auth blueprint

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/')
def hello():
    return 'Hello, world!'


# Register the auth blueprint - authentication functions
app.register_blueprint(auth_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
