import React, { useEffect, useState } from 'react';
import { getBookings } from '../services/api';

const Dashboard = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        getBookings().then(res => setBookings(res.data)).catch(err => console.error(err));
    }, []);

    return (
        <div className="container mt-5">
            <h2>Your Bookings Dashboard</h2>
            <div className="list-group mt-4">
                {bookings.map(booking => (
                    <div className="list-group-item" key={booking.id}>
                        <h5>{booking.listing_details?.food_type}</h5>
                        <p>Status: <strong>{booking.status}</strong></p>
                        <small>Booked at: {new Date(booking.timestamp).toLocaleString()}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
