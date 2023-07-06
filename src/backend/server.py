import os
import sys
import uuid
import socket
import sqlite3
from flask import Flask
from flask import request, make_response, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder="./build/static", template_folder="./build")
CORS(app)

path = os.path.dirname(sys.argv[0])
print(path)


@app.route("/", methods=["GET"])
def index():
    return "text parser:)"


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    text = data["auth"]
    email = text["email"]
    password = text["password"]
    print(email, password)
    with sqlite3.connect(f"{path}/users.db") as conn:
        # 一致するか確認
        result = conn.execute(
            f"SELECT * FROM USERS WHERE email=? AND password=?", (email, password)
        ).fetchall()
        if len(result) == 0:
            return make_response(jsonify({"status": "failed"}))
        else:
            name = conn.execute(
                f"SELECT name FROM USERS WHERE email=? AND password=?",
                (email, password),
            ).fetchall()
            return make_response(jsonify({"status": "success", "name": name}))


@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    text = data["auth"]
    id = uuid.uuid4()
    name = text["name"]
    email = text["email"]
    password = text["password"]
    with sqlite3.connect(f"{path}/users.db") as conn:
        # 一致するか確認
        result = conn.execute(f"SELECT * FROM USERS WHERE email=?", (email,)).fetchall()

        if len(result) == 0:
            # 追加する
            conn.execute(
                f"INSERT INTO USERS (id,name,email,password) VALUES('{id}','{name}','{email}','{password}')"
            )
            result = conn.execute(f"SELECT * FROM USERS").fetchall()
            return make_response(jsonify({"status": "success"}))
        else:
            return make_response(jsonify({"status": "failed"}))


@app.route("/api/send", methods=["POST"])
def register():
    data = request.get_json()
    text = data["todo_name"]
    with sqlite3.connect("products.db") as conn:
        if text != "":
            conn.execute(f"INSERT INTO PRODUCTS (name) VALUES('{text}')")
        result = conn.execute(f"SELECT * FROM PRODUCTS").fetchall()
    return make_response(jsonify({"result": result}))


@app.route("/api/delete", methods=["POST"])
def delete():
    data = request.get_json()
    delete_ids = data["post_ids"]
    with sqlite3.connect("products.db") as conn:
        conn.execute(
            f"DELETE FROM PRODUCTS WHERE id in ({','.join(map(str, delete_ids))})"
        )
        result = conn.execute(f"SELECT * FROM PRODUCTS").fetchall()

    return make_response(jsonify({"result": result}))


def createDB():
    # データベースファイルの作成
    with sqlite3.connect(f"{path}/users.db") as conn:
        conn.execute(
            f"CREATE TABLE IF NOT EXISTS USERS (id INTEGER , name STRING,email STRING, password STRING, address STRING)"
        )


if __name__ == "__main__":
    os.chdir(os.path.dirname(__file__))
    ip = socket.gethostbyname_ex(socket.gethostname())
    print(ip[2][1])
    with open("server_url.json", "w") as f:
        f.write(f'{{"url":"{ip[2][1]}"}}')
    app.run(debug=True, host="0.0.0.0", port="8000")
    # createDB()
