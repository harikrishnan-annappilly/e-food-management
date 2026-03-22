import React, { useState, useEffect } from 'react';
import { getListings } from '../../services/api';

const ProviderHistory = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                let user = JSON.parse(localStorage.getItem('user'));
                // Fetch listings that are NOT 'active' (completed or expired)
                // Since DjangoFilterBackend doesn't support NOT natively easily in simple setup, we fetch all and filter client side for history, or we fetch 'completed' and 'expired' separately.
                // For simplicity, fetch all for provider and filter here.
                const { data } = await getListings({ provider: user.id });
                setListings(data.filter(l => l.status !== 'active'));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    return (
        <div className="container py-5">
            <h2 className="text-primary fw-bold mb-4">Donation History</h2>
            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="px-4 py-3">Date Posted</th>
                                    <th className="py-3">Food Type</th>
                                    <th className="py-3">Quantity</th>
                                    <th className="px-4 py-3 text-end">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="4" className="text-center py-4"><div className="spinner-border text-primary" role="status"></div></td></tr>
                                ) : listings.length === 0 ? (
                                    <tr><td colSpan="4" className="text-center py-4 text-muted">No past donations found.</td></tr>
                                ) : (
                                    listings.map(listing => (
                                        <tr key={listing.id}>
                                            <td className="px-4">{new Date(listing.creation_time).toLocaleDateString()}</td>
                                            <td>{listing.food_type} {listing.is_veg ? '(Veg)' : ''}</td>
                                            <td>{listing.quantity} {listing.quantity_unit}</td>
                                            <td className="px-4 text-end">
                                                <span className={`badge ${listing.status === 'completed' ? 'bg-success' : 'bg-danger'}`}>
                                                    {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderHistory;
