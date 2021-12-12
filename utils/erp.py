
import datetime
from datetime import datetime
from utils.mongo import MongoUtils


class Erp():

    def __init__(self, url):
        self.erpdb = MongoUtils(url, "erp")

    def save(self, request):
        ip = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
        data = {
            "shop": request.form["shop"],
            "cookie": request.cookies,
            "ip": ip,
            "order_id": request.form["order_id"],
            "order_time": request.form["order_time"],
            "save_time": datetime.now(),
            "goods_id": request.form["goods_id"],
            "flag": request.form["flag"],
            "mask": request.form["mask"]
        }
        print(data)
        # self.erpdb.insert(data)
        return {"success": True}

    def get(self, order_id):
        return {"success": True, "data": self.erpdb.query({"order_id": order_id})}
