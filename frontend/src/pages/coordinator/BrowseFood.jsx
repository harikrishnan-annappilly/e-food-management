import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getListings } from '../../services/api';

const BrowseFood = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isVegFilter, setIsVegFilter] = useState(false);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // Fetch only active listings
                const response = await getListings({ status: 'active' });
                let fetchedData = response.data;
                if (isVegFilter) fetchedData = fetchedData.filter(item => item.is_veg === true);
                setListings(fetchedData);
            } catch (error) {
                console.error('Error fetching listings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchListings();
    }, [isVegFilter]);

    return (
        <div className="container py-5">
            <h2 className="text-primary fw-bold mb-4">Browse Available Food</h2>
            <div className="row">
                {/* Search & Filter Sidebar */}
                <div className="col-lg-3 mb-4">
                    <div className="card border-0 shadow-sm p-4 sticky-top" style={{ top: '20px' }}>
                        <h5 className="fw-bold mb-4">Filters</h5>

                        <div className="mb-4">
                            <label className="fw-semibold d-block mb-2">Dietary Preference</label>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" onChange={(e) => setIsVegFilter(e.target.checked)} />
                                <label className="form-check-label text-success">Vegetarian Only</label>
                            </div>
                        </div>

                        <button className="btn btn-primary w-100 fw-bold" onClick={() => window.location.reload()}>Refresh Feed</button>
                    </div>
                </div>

                {/* Listings Feed */}
                <div className="col-lg-9">
                    {loading ? (
                        <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
                    ) : listings.length === 0 ? (
                        <div className="alert alert-info py-4 text-center">No active listings available right now. Please check back later!</div>
                    ) : (
                        <div className="row g-4">
                            {listings.map(listing => (
                                <div key={listing.id} className="col-md-6">
                                    <div className="card shadow-sm border-0 h-100">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className={`badge ${listing.is_veg ? 'bg-success' : 'bg-danger'}`}>{listing.is_veg ? 'Vegetarian' : 'Non-Vegetarian'}</span>
                                                <span className="badge bg-warning text-dark px-2"><i className="bi bi-clock me-1"></i>Active</span>
                                            </div>
                                            <h5 className="card-title fw-bold mt-2 mb-1">{listing.food_type}</h5>
                                            <p className="small text-muted mb-3"><i className="bi bi-shop me-1"></i> {listing.provider_org || `Provider #${listing.provider}`}</p>

                                            <p className="card-text">
                                                <strong>Quantity:</strong> {listing.quantity} {listing.quantity_unit}
                                            </p>
                                            <Link to={`/coordinator/listing/${listing.id}`} className="btn btn-outline-primary w-100 fw-bold">View Details</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BrowseFood;
