#  RoadTrip Travel - Full-Stack Travel Booking App 
**RoadTrip Travel** is a full-stack web application for booking travel trips. It allows users to browse trips, make bookings, and manage reservations while having the option to add guests and update them if needed.

## Features
-User can view available trips  
-User can create bookings  
-User can update bookings (change guest count)  
-User can delete bookings  
-Admin can manage trip listings  

## Technologies used
**Frontend:** React, React Router, Axios  
**Backend:** Flask, Flask SQLAlchemy, PostgreSQL  
**Deployment:** Render (Backend), Vercel (Frontend) 

## Installation & Setup
### **Backend Setup (Flask)**  
1. Clone the repository:  
   ```sh
   git clone https://github.com/your-username/roadtrip-travel.git
   cd roadtrip-travel/backend

2. Create a virtual environment and install dependencies:
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt

3. Set up the database:
    flask db upgrade

4. Run the Flask server:
    flask run

### **Frontend Setup (React)**
1.  Go to the frontend directory:
    cd ../frontend

2.  Install dependencies:
    npm install

3.  Update API URLs in axios requests (point to deployed backend)

4.  Run the React app:
    npm start


## Author
*Sean Daniel*

https://github.com/sean810/roadtrip-travel

## Contributing
Pull requests are welcome! Feel free to improve the project.

