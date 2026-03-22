import React, { useState, useEffect } from 'react';
import { getBookings, updateBooking } from '../../services/api';

const MyBookings = () => {
    const [activeTab, setActiveTab] = useState('active');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                let user = JSON.parse(localStorage.getItem('user'));
                const { data } = await getBookings({ coordinator: user.id });
                setBookings(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const handleAction = async (id, statusChange) => {
        try {
            await updateBooking(id, { status: statusChange });
            // optimistically update view
            setBookings(bookings.map(b => b.id === id ? { ...b, status: statusChange } : b));
        } catch (e) {
            console.error(e);
        }
    };

    const activeBookings = bookings.filter(b => b.status === 'pending_pickup');
    const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

    const displaySet = activeTab === 'active' ? activeBookings : pastBookings;

    return (
        <div className="container py-5">
            <h2 className="text-primary fw-bold mb-4">My Bookings</h2>

            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button className={`nav-link fw-bold ${activeTab === 'active' ? 'active text-primary' : 'text-muted'}`} onClick={() => setActiveTab('active')}>
                        Active Pickups
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link fw-bold ${activeTab === 'past' ? 'active text-primary' : 'text-muted'}`} onClick={() => setActiveTab('past')}>
                        Past History
                    </button>
                </li>
            </ul>

            {loading ? (
                <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
            ) : displaySet.length === 0 ? (
                <div className="alert alert-info py-4 text-center">No bookings found in this category.</div>
            ) : (
                <div className="row g-4">
                    {displaySet.map(b => (
                        <div key={b.id} className="col-md-6 col-lg-4">
                            <div className={`card ${activeTab === 'active' ? 'shadow-sm border-start border-warning border-4' : 'border-0 bg-light opacity-75'} h-100`}>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className={`badge ${b.status === 'completed' ? 'bg-success' : b.status === 'cancelled' ? 'bg-danger' : 'bg-warning text-dark'} px-2`}>
                                            {b.status.replace('_', ' ').toUpperCase()}
                                        </span>
                                    </div>
                                    <h5 className="card-title fw-bold">{b.listing_details?.food_type || `Listing #${b.listing}`}</h5>

                                    {activeTab === 'active' ? (
                                        <>
                                            <p className="text-muted small mb-2"><i className="bi bi-geo-alt"></i> Location: {b.listing_details?.location || 'Contact Provider'}</p>
                                            <hr />
                                            <h6 className="mb-1">Pickup Code: <strong className="text-primary font-monospace tracking-wide">FH-{b.id}0{b.listing}</strong></h6>
                                        </>
                                    ) : (
                                        <p className="text-muted small mt-2 mb-0">Booked: {new Date(b.timestamp).toLocaleDateString()}</p>
                                    )}
                                </div>
                                {activeTab === 'active' && (
                                    <div className="card-footer bg-white border-top-0 d-flex justify-content-between pb-3">
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleAction(b.id, 'cancelled')}>Cancel</button>
                                        <button className="btn btn-primary btn-sm" onClick={() => handleAction(b.id, 'completed')}>Mark Collected</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
