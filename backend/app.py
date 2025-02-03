from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from config import Config
from models import db
from routes.user_routes import user_routes
from routes.trip_routes import trip_routes
from routes.booking_routes import booking_routes

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

# Register routes
app.register_blueprint(user_routes, url_prefix='/users')
app.register_blueprint(trip_routes, url_prefix='/trips')
app.register_blueprint(booking_routes, url_prefix='/bookings')

if __name__ == "__main__":
    app.run(debug=True)
