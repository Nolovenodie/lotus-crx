
import datetime
from datetime import datetime
from utils.mongo import MongoUtils


class Log():

    def __init__(self, url):
        self.logdb = MongoUtils(url, "log")

    def log(self, user, content, request):
        ip = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
        data = {
            "user": user,
            "ip": ip,
            "time": datetime.now(),
            "content": content
        }
        self.logdb.insert(data)
        return content

    """
    Log status specification
    """

    def error(self, user, content, request):
        return self.log(user, "[Error] " + content, request)

    def info(self, user, content, request):
        return self.log(user, "[Info] " + content, request)

    def success(self, user, content, request):
        return self.log(user, "[Success] " + content, request)
