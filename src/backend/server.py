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
            userId = conn.execute(
                f"SELECT id FROM USERS WHERE email=? AND password=?",
                (email, password),
            ).fetchall()
            return make_response(jsonify({"status": "success", "name": name[0][0], "userId": userId[0][0]}))


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
            return make_response(jsonify({"status": "success", "userId": id}))
        else:
            return make_response(jsonify({"status": "failed"}))


@app.route("/api/getUser/<userUuid>", methods=["GET"])
def getUser(userUuid):
    with sqlite3.connect(f"{path}/users.db") as conn:
        result = conn.execute(f"SELECT * FROM USERS WHERE id=?", (userUuid,)).fetchall()
        print(result[0])
        return make_response(jsonify({"status": "success", "user": result}))


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
    

@app.route("/api/getSearchProducts/<searchText>", methods=["GET"])
def getSearchProducts(searchText):
    with sqlite3.connect(f"{path}/products.db") as conn:
        # 検索は名前と商品説明から検索
        result = conn.execute(f"SELECT * FROM PRODUCTS WHERE name LIKE '%{searchText}%' OR description LIKE '%{searchText}%'").fetchall()
        print(f"result:{result}")
        for i,d in enumerate(result):
            result[i] = list(d)
            result[i].append("False")
    with sqlite3.connect(f"{path}/products.db") as conn:
        result_2 = conn.execute("SELECT * FROM PRODUCTS WHERE sdgs=? ORDER BY RANDOM() LIMIT 2",("True",)).fetchall()
        # 各要素の最後にisAdd = Trueを追加
        for i,d in enumerate(result_2):
            result_2[i] = list(d)
            result_2[i].append("True")
        result_2.extend(result)
        print(f"result_2:{result_2}")
        return make_response(jsonify({"status": "success", "products": result_2}))


@app.route("/api/getProductDetail/<productUuid>", methods=["GET"])
def getProductDetail(productUuid):
    with sqlite3.connect(f"{path}/products.db") as conn:
        result = conn.execute(f"SELECT * FROM PRODUCTS WHERE id=?", (productUuid,)).fetchall()
        print(result)
        return make_response(jsonify({"status": "success", "product": result}))


@app.route("/api/addCart", methods=["POST"])
def addCart():
    data = request.get_json()
    print(data)
    cartId = uuid.uuid4()
    productId = data["productUuid"]
    userId = data["userUuid"]
    size = data["size"]
    with sqlite3.connect(f"{path}/cart.db") as conn:
        conn.execute(
            f"INSERT INTO CART (cartid,userid,productid,size) VALUES('{cartId}','{userId}','{productId}','{size}')"
        )
        result = conn.execute(f"SELECT * FROM CART").fetchall()
        print(result)
        return make_response(jsonify({"status": "success"}))
        

@app.route("/api/getCart/<userUuid>", methods=["GET"])
def getCart(userUuid):
    result = []
    size = []
    price = 0
    with sqlite3.connect(f"{path}/cart.db") as conn:
        result = conn.execute(f"SELECT * FROM CART WHERE userid=?", (userUuid,)).fetchall()
        # print(result)
        size = conn.execute(f"SELECT size FROM CART WHERE userid=?", (userUuid,)).fetchall()
        size =[i[0] for i in size]
        cartId = conn.execute(f"SELECT cartid FROM CART WHERE userid=?", (userUuid,)).fetchall()
        cartId =[i[0] for i in cartId]
    with sqlite3.connect(f"{path}/products.db") as conn:
        for i,d in enumerate(result):
            product = conn.execute(f"SELECT * FROM PRODUCTS WHERE id=?", (d[2],)).fetchall()
            result[i] = list(product[0])
            result[i].append(cartId[i])
            size[i] = size[i].split(",")
            result[i].append(size[i])
            print(result[i])
            # sdgsがtrueの場合はprice*0.8, falseの場合はpriceを加算
            if result[i][5] == "True":
                print(round(result[i][2]*0.88))
                price += round(result[i][2]*0.88)
            else:
                print(round(result[i][2]*1.1))
                price += round(result[i][2]*1.1)
        print(result)
        return make_response(jsonify({"status": "success", "products": result, "size" : size, "price": price}))


@app.route("/api/deleteCart/<cartId>", methods=["DELETE"])
def deleteCart(cartId):
    with sqlite3.connect(f"{path}/cart.db") as conn:
        conn.execute(f"DELETE FROM CART WHERE cartid=?", (cartId,))
        result = conn.execute(f"SELECT * FROM CART").fetchall()
        print(result)
        return make_response(jsonify({"status": "success"}))


@app.route("/api/purchase", methods=["POST"])
def purchase():
    result = []
    data = request.get_json()
    print(data)
    with sqlite3.connect(f"{path}/cart.db") as conn:
        result = conn.execute(f"SELECT * FROM CART WHERE userid=?", (data["userUuid"],)).fetchall()
        print(f'result:{result}')
        for i in result:
            conn.execute(f"DELETE FROM CART WHERE cartid=?", (i[0],))
        result = conn.execute(f"SELECT * FROM CART").fetchall()
    with sqlite3.connect(f"{path}/products.db") as conn:
        for i,d in enumerate(result):
            print(f'i:{i},d:{d}')
            # そのサイズの在庫を1減らす,在庫が0の場合は何もしない
            stock = conn.execute(f"SELECT {d[3]} FROM PRODUCTS WHERE id='{d[2]}'").fetchall()
            print(f'stock:{stock}')
            if stock[0][0] <= 0:
                print("stock<=0")
                continue
            else:
                print("stock>0")
                product = conn.execute(f"UPDATE PRODUCTS SET {d[3]}={d[3]}-1 WHERE id='{d[2]}'").fetchall()
                print(product)
        return make_response(jsonify({"status": "success", "products": result}))



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
            "CREATE TABLE IF NOT EXISTS CART (cartid INTEGER, userid INTEGER, productid INTEGER, size STRING)"
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
            sdgs = random.choice([True, False])
            print(f"sdgs:{sdgs}")
            s=input("s:")
            m=input("m:")
            l=input("l:")

            conn.execute(
                f"INSERT INTO PRODUCTS (id,name, price, image, description, sdgs, s, m, l) VALUES('{id}','{name}','{price}','{image}','{description}','{sdgs}','{s}','{m}','{l}')"
            )
            result = conn.execute(f"SELECT * FROM PRODUCTS").fetchall()
            print(result)
            print("Added!")
            #move to addeed_image
            os.rename(product, f"/Users/masataka/Coding/React/imse/public/added_image/{image}")


def alterColumn():
    with sqlite3.connect(f"{path}/products.db") as conn:
        conn.execute("ALTER TABLE PRODUCTS DROP COULUMN")
        # conn.execute("ALTER TABLE PRODUCTS ADD S STRING")
        # conn.execute("ALTER TABLE PRODUCTS ADD M STRING")
        # conn.execute("ALTER TABLE PRODUCTS ADD L STRING")


def addStock():
    with sqlite3.connect(f"{path}/products.db") as conn:
        # 上の行から順にs,m,lの値をランダムに挿入する
        products = conn.execute("SELECT * FROM PRODUCTS").fetchall()
        for product in products:
            s = random.randint(0, 10)
            m = random.randint(0, 10)
            l = random.randint(0, 10)
            conn.execute(
                f"UPDATE PRODUCTS SET s='{s}', m='{m}', l='{l}' WHERE id='{product[0]}'"
            )
            result = conn.execute(f"SELECT * FROM PRODUCTS").fetchall()
            print(result)
            print("Added!")


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
    # alterColumn()
    # addStock()
