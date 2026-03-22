import React, { useState, useEffect } from 'react';
import { getListings } from '../../services/api';

const GlobalListings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMaster = async () => {
            try {
                const { data } = await getListings();
                setListings(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMaster();
    }, []);

    return (
        <div className="container py-5">
            <h2 className="text-primary fw-bold mb-4">Global Listings Monitor <span className="badge bg-danger fs-6 text-white align-top ms-2">ADMIN</span></h2>
            <div className="card shadow-sm border-0">
                <div className="card-header bg-white border-bottom-0 py-3 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold">Master Database View ({listings.length} Entries)</h5>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="px-4">LID</th>
                                <th>Provider ID</th>
                                <th>Food Type</th>
                                <th>Dietary</th>
                                <th>Quantity</th>
                                <th className="text-end">System Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" className="text-center py-4"><div className="spinner-border text-primary" role="status"></div></td></tr>
                            ) : listings.length === 0 ? (
                                <tr><td colSpan="6" className="text-center py-4 text-muted">No food listings recorded in the database.</td></tr>
                            ) : (
                                listings.map(l => (
                                    <tr key={l.id}>
                                        <td className="px-4 fw-mono text-muted small">#{l.id}</td>
                                        <td><i className="bi bi-shop text-primary me-2"></i>{l.provider_name || `Prov-${l.provider}`}</td>
                                        <td className="fw-semibold">{l.food_type}</td>
                                        <td>{l.is_veg ? <span className="text-success fw-bold">Veg</span> : <span className="text-danger fw-bold">Non-Veg</span>}</td>
                                        <td>{l.quantity} {l.quantity_unit}</td>
                                        <td className="text-end">
                                            <span className={`badge ${l.status === 'active' ? 'bg-primary' : l.status === 'booked' ? 'bg-warning text-dark' : l.status === 'completed' ? 'bg-success' : 'bg-danger'}`}>
                                                {l.status.toUpperCase()}
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

export default GlobalListings;
