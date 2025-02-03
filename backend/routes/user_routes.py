from flask import Blueprint, jsonify
from models import User

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{"id": u.id, "name": u.name, "email": u.email} for u in users])
