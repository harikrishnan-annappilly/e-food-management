import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBookings } from '../../services/api';

const CoordinatorDashboard = () => {
    const [stats, setStats] = useState({ completed: 0, active: 0, impact: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                let user = JSON.parse(localStorage.getItem('user'));
                const { data } = await getBookings({ coordinator: user.id });

                let completedCount = 0;
                let activeCount = 0;
                let impactPoints = 0;

                data.forEach(booking => {
                    if (booking.status === 'completed') {
                        completedCount++;
                        impactPoints += 50; // Every completed pickup yields 50 impact pts
                    }
                    if (booking.status === 'pending_pickup') activeCount++;
                });

                setStats({
                    completed: completedCount,
                    active: activeCount,
                    impact: impactPoints
                });
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
                <h2 className="text-primary fw-bold">Coordinator Dashboard</h2>
                <Link to="/coordinator/browse" className="btn btn-warning fw-bold text-dark shadow-sm">Browse Food</Link>
            </div>
            <div className="row g-4 mb-5">
                <div className="col-md-4">
                    <div className="card p-4 shadow-sm border-0 border-start border-success border-4 h-100">
                        <h6 className="text-muted text-uppercase fw-semibold mb-2">Total Pickups Completed</h6>
                        <h2 className="fw-bold mb-0 text-dark">{loading ? '...' : stats.completed}</h2>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-4 shadow-sm border-0 border-start border-warning border-4 h-100">
                        <h6 className="text-muted text-uppercase fw-semibold mb-2">Active Pickups Pending</h6>
                        <h2 className="fw-bold mb-0 text-dark">{loading ? '...' : stats.active}</h2>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-4 shadow-sm border-0 border-start border-primary border-4 h-100">
                        <h6 className="text-muted text-uppercase fw-semibold mb-2">Impact Score</h6>
                        <h2 className="fw-bold mb-0 text-dark">{loading ? '...' : stats.impact} <small className="fs-6 text-muted">pts</small></h2>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm border-0 bg-light p-5 text-center">
                <h4 className="fw-bold text-primary mb-3">Live Food Map Engine</h4>
                <p className="text-muted">Currently calculating logistics metrics for your territory...</p>
                <div className="rounded bg-white border d-flex flex-column justify-content-center align-items-center" style={{ height: '250px' }}>
                    <i className="bi bi-map text-success mb-2" style={{ fontSize: '4rem' }}></i>
                    <span className="text-muted fw-semibold">GPS Integration Idle</span>
                </div>
            </div>
        </div>
    );
};

export default CoordinatorDashboard;
