import json
import hashlib
# from gevent import pywsgi
import random
from datetime import datetime
from config.config import *
from utils.mongo import MongoUtils
from utils.utils import *
from utils.log import Log
from utils.erp import Erp
from flask import Flask, request
from flask_cors import *

app = Flask(__name__, static_folder="static", static_url_path="/")
CORS(app, resources=r'/*')

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JSON_AS_ASCII"] = False
app.config["SECRET_KEY"] = CONFIG_SECRET_KEY

mongo = MongoUtils(CONFIG_MONGO_URL, "user")
item = MongoUtils(CONFIG_MONGO_URL, "item")
log = Log(CONFIG_MONGO_URL)
erp = Erp(CONFIG_MONGO_URL)


@app.route("/login", methods=["POST"])
def login():
    if not "user" in request.form or not "pass" in request.form:
        return log.info("", "请先输入账号密码!", request)

    match = {
        "user": request.form["user"],
        "pass": request.form["pass"]
    }

    # if request.form["user"] == "L":
    #     return "Error 500--Internal Server Error"

    if not mongo.count(match):
        return log.error(match["user"], "账号或密码错误!", request)

    sign_time = datetime.now()
    sign = app.config["SECRET_KEY"] + str(sign_time) + match["user"]
    sign = hashlib.md5(sign.encode("utf-8")).hexdigest()

    data = {
        "sign": sign,
        "sign_time": sign_time,
        "last_ip": request.environ.get("HTTP_X_REAL_IP", request.remote_addr),
        "last_time": datetime.now()
    }
    mongo.update(match, data)

    log.info(match["user"], "登录成功:" + sign, request)
    return "success:" + sign


@app.route("/data", methods=["GET"])
def data():
    if not "sign" in request.args or not "user" in request.args:
        return log.error("", "签名验证失败!", request)

    match = {
        "user": request.args["user"],
        "sign": request.args["sign"]
    }

    info = mongo.query(match)
    if info is None:
        return log.error(match["user"], "签名验证失败!", request)

    key = match["user"] + match["sign"]
    key = hashlib.md5(key.encode("utf-8")).hexdigest()

    with open("config/data.json") as fp:
        data = json.load(fp)

    data["expire"] = info["expire"]
    if "type" in info:
        data["type"] = info["type"]

    data = json.dumps(data, indent=4, ensure_ascii=False)
    rc4 = rc4_crypt(data.encode("utf-8"), key.encode("utf-8"))

    data = {
        "sign": "",
        "sign_time": None,
    }
    mongo.update(match, data)

    log.success(match["user"], "签名验证成功!", request)
    return "success:" + rc4


@app.route("/repeat", methods=["GET"])
def repeat():
    if not "user" in request.args or not "goods" in request.args:
        return log.info("", "Repeat / 未知的参数!", request)

    # if request.args["user"] == "L" and random.randint(0, 100) != 50:
    #     return "1"

    match = {
        "user": request.args["user"],
        "goods": request.args["goods"]
    }
    count = item.count(match)

    if not count:
        data = {
            "user": request.args["user"],
            "goods": request.args["goods"],
            "time": datetime.now()
        }

        item.insert(data)

    return str(count)


@app.route("/create", methods=["GET"])
def create():
    if not "user" in request.args or not "pass" in request.args or not "sign" in request.args:
        return log.info("", "Create / 请先输入账号密码!", request)

    if request.args["sign"] != CONFIG_SECRET_KEY:
        return log.error(request.args["user"], "Create / 验证失败!", request)

    data = {
        "user": request.args["user"],
        "pass": request.args["pass"],
        "type": None,
        "expire": "Life time",
        "sign": "",
        "sign_time": None,
        "last_ip": "",
        "last_time": None,
    }

    mongo.insert(data)
    return log.success(data["user"], "Create / 新增用户成功!", request)


@app.route("/erp/order", methods=["GET", "POST"])
def erp_order():
    if not "id" in request.args:
        return {"success": False, "message": "🤕未知的订单!"}

    ret = {"success": False, "message": "🤕错误的请求!"}
    order_id = request.args["id"]

    if "GET" in request.method:
        ret = erp.get(order_id)

    elif "POST" in request.method:
        ret = erp.save(request)

    return "callback("+json.dumps(ret)+")"


if __name__ == "__main__":
    print("Server address: http://127.0.0.1:8686/")
    app.run(debug=True, port=8686)
    # server = pywsgi.WSGIServer(("0.0.0.0", 8080), app)
    # server.serve_forever()
