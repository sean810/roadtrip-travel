from flask import Blueprint, request, jsonify
from models import db, User
import jwt
from datetime import datetime, timedelta
from werkzeug.security import check_password_hash

user_routes = Blueprint('user_routes', __name__)

# Secret key for JWT encoding
SECRET_KEY = 'your_secret_key_here'

# Route to get all users
@user_routes.route('/', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{"id": u.id, "name": u.name, "email": u.email} for u in users])

# Login route
@user_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Ensure the email and password are provided
    if not data.get('email') or not data.get('password'):
        return jsonify({"message": "Missing email or password"}), 400

    # Find the user by email
    user = User.query.filter_by(email=data['email']).first()

    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"message": "Invalid credentials"}), 401  # Unauthorized

    # Create a JWT token
    token = jwt.encode(
        {"sub": user.id, "exp": datetime.utcnow() + timedelta(hours=1)}, 
        SECRET_KEY, 
        algorithm="HS256"
    )

    return jsonify({"message": "Login successful", "token": token}), 200
