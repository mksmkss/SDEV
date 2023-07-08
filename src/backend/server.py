import os
import sys
import uuid
import glob
import socket
import random
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


@app.route("/api/sdgsProducts", methods=["GET"])
def getSdgsProducts():
    with sqlite3.connect(f"{path}/products.db") as conn:
        result = conn.execute("SELECT * FROM PRODUCTS WHERE sdgs=?",("True",)).fetchall() 
        print(result)
        return make_response(jsonify({"status": "success", "products": result}))


@app.route("/api/randomProducts", methods=["GET"])
def getRandomProducts():
    with sqlite3.connect(f"{path}/products.db") as conn:
        result = conn.execute("SELECT * FROM PRODUCTS ORDER BY RANDOM() LIMIT 4").fetchall()
        print(result)
        return make_response(jsonify({"status": "success", "products": result}))


@app.route("/api/getProductDetail/<productUuid>", methods=["GET"])
def getProductDetail(productUuid):
    with sqlite3.connect(f"{path}/products.db") as conn:
        result = conn.execute(f"SELECT * FROM PRODUCTS WHERE id=?", (productUuid,)).fetchall()
        print(result)
        return make_response(jsonify({"status": "success", "product": result}))


def createUSERDB():
    # データベースファイルの作成
    with sqlite3.connect(f"{path}/users.db") as conn:
        conn.execute(
            "CREATE TABLE IF NOT EXISTS USERS (id INTEGER , name STRING,email STRING, password STRING, address STRING)"
        )


def createPRODUCTDB():
    # データベースファイルの作成
    with sqlite3.connect(f"{path}/products.db") as conn:
        conn.execute(
            "CREATE TABLE IF NOT EXISTS PRODUCTS (id INTEGER, name STRING, price INTEGER, image STRING, description STRING, size STRING, stock INTEGER, sdgs BOOLEAN)"
        )


def createCARTDB():
    # データベースファイルの作成
    with sqlite3.connect(f"{path}/cart.db") as conn:
        conn.execute(
            "CREATE TABLE IF NOT EXISTS CART (userid INTEGER, productid INTEGER)"
        )


def createREVIEWSDB():
    # データベースファイルの作成
    with sqlite3.connect(f"{path}/reviews.db") as conn:
        conn.execute(
            "CREATE TABLE IF NOT EXISTS REVIEWS (userid INTEGER, productid INTEGER, review STRING, rating INTEGER)"
        )


def addProducts():
    with sqlite3.connect(f"{path}/products.db") as conn:
        products = glob.glob("/Users/masataka/Coding/React/imse/public/image/*")
        for product in products:
            id = uuid.uuid4()
            name = product.split("/")[-1].split("_")[0]
            print(name)
            price = input("price:")
            print("\n")
            image = product.split("/")[-1]
            print("\n")
            description = input("description:")
            print("\n")
            size = random.choice(["S", "M", "L"])
            print(f"size:{size}")
            print("\n")
            stock = input("stock:")
            print("\n")
            sdgs = random.choice([True, False])
            print(f"sdgs:{sdgs}")
            conn.execute(
                f"INSERT INTO PRODUCTS (id,name, price, image, description,size, stock, sdgs) VALUES('{id}','{name}','{price}','{image}','{description}','{size}','{stock}','{sdgs}')"
            )
            result = conn.execute(f"SELECT * FROM PRODUCTS").fetchall()
            print(result)
            print("Added!")
            #move to addeed_image
            os.rename(product, f"/Users/masataka/Coding/React/imse/public/added_image/{image}")



if __name__ == "__main__":
    os.chdir(os.path.dirname(__file__))
    """ 
        ip = socket.gethostbyname_ex(socket.gethostname())[2][1]
         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^
        IndexError: list index out of range
        とエラーが出た場合は
        ip = socket.gethostbyname_ex(socket.gethostname())[2][0]
        に変更してください
    """
    ip = socket.gethostbyname_ex(socket.gethostname())[2][0]
    print(ip)
    with open("server_url.json", "w") as f:
        f.write(f'{{"url":"{ip}"}}')
    app.run(debug=True, host="0.0.0.0", port="8000")

    # createPRODUCTDB()
    # createUSERDB()
    # createCARTDB()
    # createREVIEWSDB()
    # addProducts()
