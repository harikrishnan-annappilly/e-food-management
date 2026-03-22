import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getListings } from '../../services/api';

const ProviderDashboard = () => {
    const [stats, setStats] = useState({ active: 0, pending: 0, total_food: 0 });
    const [recentListings, setRecentListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                let user = JSON.parse(localStorage.getItem('user'));
                const { data } = await getListings({ provider: user.id });

                let activeCount = 0;
                let pendingCount = 0;
                let totalDonated = 0;

                const sorted = data.sort((a, b) => new Date(b.creation_time) - new Date(a.creation_time));

                sorted.forEach(listing => {
                    if (listing.status === 'active') activeCount++;
                    if (listing.status === 'booked') pendingCount++;
                    if (listing.status === 'completed' || listing.status === 'booked') {
                        totalDonated += parseFloat(listing.quantity);
                    }
                });

                setStats({
                    active: activeCount,
                    pending: pendingCount,
                    total_food: totalDonated.toFixed(0)
                });

                setRecentListings(sorted.slice(0, 5)); // show latest 5
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary fw-bold">Provider Dashboard</h2>
                <Link to="/provider/add-listing" className="btn btn-warning fw-bold text-dark shadow-sm">+ Add New Listing</Link>
            </div>
            <div className="row g-4 mb-5">
                <div className="col-md-4">
                    <div className="card p-4 shadow-sm border-0 border-start border-primary border-4 h-100">
                        <h6 className="text-muted text-uppercase fw-semibold mb-2">Total Active Listings</h6>
                        <h2 className="fw-bold mb-0 text-dark">{loading ? '...' : stats.active}</h2>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-4 shadow-sm border-0 border-start border-warning border-4 h-100">
                        <h6 className="text-muted text-uppercase fw-semibold mb-2">Pending Pickups</h6>
                        <h2 className="fw-bold mb-0 text-dark">{loading ? '...' : stats.pending}</h2>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-4 shadow-sm border-0 border-start border-success border-4 h-100">
                        <h6 className="text-muted text-uppercase fw-semibold mb-2">Total Food Pledged</h6>
                        <h2 className="fw-bold mb-0 text-dark">{loading ? '...' : stats.total_food} <small className="fs-6 text-muted">units</small></h2>
                    </div>
                </div>
            </div>

            <h4 className="fw-bold mb-3">Recent Transactions</h4>
            <div className="card shadow-sm border-0 overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="px-4">Date Posted</th>
                                <th>Food Type</th>
                                <th>Quantity</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4" className="text-center py-4"><div className="spinner-border text-primary" role="status"></div></td></tr>
                            ) : recentListings.length === 0 ? (
                                <tr><td colSpan="4" className="text-center py-4 text-muted">No recent transactions.</td></tr>
                            ) : (
                                recentListings.map(listing => (
                                    <tr key={listing.id}>
                                        <td className="px-4">{new Date(listing.creation_time).toLocaleDateString()}</td>
                                        <td className="fw-semibold">{listing.food_type}</td>
                                        <td>{listing.quantity} {listing.quantity_unit}</td>
                                        <td>
                                            <span className={`badge ${listing.status === 'active' ? 'bg-primary' : listing.status === 'booked' ? 'bg-warning text-dark' : listing.status === 'completed' ? 'bg-success' : 'bg-danger'}`}>
                                                {listing.status.toUpperCase()}
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
    );
};

export default ProviderDashboard;
