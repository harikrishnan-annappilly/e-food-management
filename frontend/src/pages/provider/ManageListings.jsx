import React, { useState, useEffect } from 'react';
import { getListings, updateListing } from '../../services/api';

const ManageListings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                let user = JSON.parse(localStorage.getItem('user'));
                const { data } = await getListings({ provider: user.id, status: 'active' });
                setListings(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchListings();
    }, []);

    const markSpoiled = async (id) => {
        try {
            await updateListing(id, { status: 'expired' });
            setListings(listings.filter(listing => listing.id !== id));
        } catch (err) {
            console.error('Failed to expire listing', err);
        }
    };

    return (
        <div className="container py-5">
            <h2 className="text-primary fw-bold mb-4">Manage Active Listings</h2>
            {loading ? (
                <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
            ) : listings.length === 0 ? (
                <div className="alert alert-info py-4 text-center">No active listings found. Post a new donation!</div>
            ) : (
                <div className="row g-4">
                    {listings.map(listing => (
                        <div key={listing.id} className="col-md-6 col-lg-4">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className={`badge ${listing.is_veg ? 'bg-success' : 'bg-danger'}`}>{listing.is_veg ? 'Veg' : 'Non-Veg'}</span>
                                        <span className="badge bg-warning text-dark px-2"><i className="bi bi-clock me-1"></i>Active</span>
                                    </div>
                                    <h5 className="card-title fw-bold">{listing.food_type}</h5>

                                    <div className="card-text text-muted mb-3">
                                        <p className="mb-1"><strong>Est. Quantity:</strong> {listing.quantity} {listing.quantity_unit}</p>
                                        <p className="mb-0 text-truncate"><i className="bi bi-geo-alt"></i> {listing.location}</p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                                        <button className="btn btn-outline-danger btn-sm fw-semibold" onClick={() => markSpoiled(listing.id)}>
                                            Mark as Spoiled/Expired
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageListings;
