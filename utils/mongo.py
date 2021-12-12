import pymongo

"""
Mongo Dao
"""


class MongoUtils:

    def __init__(self, url, args):
        self.url = url

        self.client = pymongo.MongoClient(url)
        self.col = self.client["lotus"][args]

    def count(self, match={}):
        return self.col.count_documents(match)

    def insert(self, data):
        try:
            self.col.insert_one(data)
            return True
        except Exception as e:
            print("🤕Mongo Error > An exception occurred ::", e)
            return False

    def update(self, match={}, data={}, upsert=False):
        return self.col.update_one(match, {"$set": data}, upsert=upsert)

    def query(self, match={}):
        return self.col.find_one(match)
