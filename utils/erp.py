from utils.utils import times
from utils.mongo import MongoUtils


class Erp():

    def __init__(self, url):
        self.erpdb = MongoUtils(url, "erp")

    def save(self, request):
        ip = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
        data = {
            "shop": request.form["shop"],
            "cookie": request.form["cookie"],
            "ip": ip,
            "order_id": request.form["order_id"],
            "order_time": request.form["order_time"],
            "save_time": times(),
            "goods_id": request.form["goods_id"],
            "flag": request.form["flag"],
            "mark": request.form["mark"]
        }
        self.erpdb.update({"order_id": data["order_id"]}, data, True)
        return {"success": True}

    def get(self, order_id):
        ret = self.erpdb.query({"order_id": order_id})
        data = {}
        if ret != None:
            data = {
                "flag": ret["flag"],
                "mark": ret["mark"]
            }
        return {"success": True, "data": data}
