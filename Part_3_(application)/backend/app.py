import flask
from flask import Flask
import json

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello, World!"

@app.route('/users', methods=["GET"])
def users():
    print("users endpoint reached...")
    with open("users.json", "r") as f:
        data = json.load(f)
        data.append({
            "username": "user4",
            "pets": ["hamster"]
        })

        return flask.jsonify(data)

if __name__ == "__main__":
    app.run("localhost", 6969)

from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello, World!"


if __name__ == "__main__":
    app.run("localhost", 6969)