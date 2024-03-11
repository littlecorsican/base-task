from flask import request
from flask_restful import Resource

class Container(Resource):
    def get(self):
        query = request.args.get("query", None)
        return {"message": "Missing required query param"}, 400