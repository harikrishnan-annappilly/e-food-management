import React, { useEffect, useState } from 'react';
import { getListings, createBooking } from '../services/api';

const Home = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        getListings().then(res => setListings(res.data)).catch(err => console.error(err));
    }, []);

    const handleBook = (id) => {
        createBooking({ listing: id }).then(() => {
            alert('Booked successfully!');
        }).catch(err => console.error(err));
    };

    return (
        <div className="container mt-5">
            <h2>Available Food Listings</h2>
            <div className="row mt-4">
                {listings.map(listing => (
                    <div className="col-md-4 mb-4" key={listing.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{listing.food_type}</h5>
                                <p className="card-text">
                                    <strong>Quantity:</strong> {listing.quantity} <br />
                                    <strong>Location:</strong> {listing.location} <br />
                                    <strong>Expires:</strong> {new Date(listing.expiry_time).toLocaleString()}
                                </p>
                                <button className="btn btn-primary" onClick={() => handleBook(listing.id)}>Book Food</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
