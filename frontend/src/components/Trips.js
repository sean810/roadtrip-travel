import { useEffect, useState } from 'react';
import { fetchTrips } from '../api/api';

function Trips() {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        fetchTrips().then(data => setTrips(data));
    }, []);

    return (
        <div>
            <h1>Available Trips</h1>
            {trips.map(trip => (
                <div key={trip.id}>
                    <h3>{trip.destination}</h3>
                    <p>Price: ${trip.price}</p>
                </div>
            ))}
        </div>
    );
}

export default Trips;
