from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from config import Config
from models import db, User
from routes.user_routes import user_routes
from routes.trip_routes import trip_routes
from routes.booking_routes import booking_routes

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)

# CORS Configuration
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)  # Allow React app to access API

# Set up JWT
jwt = JWTManager(app)

# Home route to prevent 404 errors on root URL
@app.route('/')
def home():
    return jsonify({"message": "Welcome to RoadTrip Travel API"})

# Signup route (create user with hashed password)
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'message': 'All fields are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 400

    user = User(name=name, email=email)
    user.set_password(password)  # Set the password hash
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

# Login route (generate JWT token if credentials are correct)
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):  # Check if password matches
        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

# Protected route to test JWT authentication
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify(message="Welcome to the protected route!")

# Register routes
app.register_blueprint(user_routes, url_prefix='/users')
app.register_blueprint(trip_routes, url_prefix='/api/trips')
app.register_blueprint(booking_routes, url_prefix='/api/bookings')

if __name__ == "__main__":
    app.run(debug=True)
