import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');
    let user = null;
    try { user = JSON.parse(localStorage.getItem('user')); } catch (e) { }

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ backgroundColor: 'var(--primary-green)' }}>
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">🌿 Excess Food Sharing</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-lg-center">
                        <li className="nav-item me-lg-3">
                            <Link className="nav-link text-white fw-semibold" to="/">Home</Link>
                        </li>
                        {token && user ? (
                            <>
                                {user.role === 'admin' && (
                                    <>
                                        <li className="nav-item me-lg-2"><Link className="nav-link text-white" to="/admin/dashboard">Dashboard</Link></li>
                                        <li className="nav-item me-lg-2"><Link className="nav-link text-white" to="/admin/users">User Directory</Link></li>
                                        <li className="nav-item me-lg-4"><Link className="nav-link text-white" to="/admin/listings">Global Database</Link></li>
                                    </>
                                )}
                                {user.role === 'provider' && (
                                    <>
                                        <li className="nav-item me-lg-2"><Link className="nav-link text-white" to="/provider/dashboard">Dashboard</Link></li>
                                        <li className="nav-item me-lg-2"><Link className="nav-link text-white" to="/provider/add-listing">Post Donation</Link></li>
                                        <li className="nav-item me-lg-2"><Link className="nav-link text-white" to="/provider/manage-listings">Manage Live</Link></li>
                                        <li className="nav-item me-lg-4"><Link className="nav-link text-white" to="/provider/history">History</Link></li>
                                    </>
                                )}
                                {user.role === 'coordinator' && (
                                    <>
                                        <li className="nav-item me-lg-2"><Link className="nav-link text-white" to="/coordinator/dashboard">Dashboard</Link></li>
                                        <li className="nav-item me-lg-2"><Link className="nav-link text-white" to="/coordinator/browse">Browse Food Map</Link></li>
                                        <li className="nav-item me-lg-4"><Link className="nav-link text-white" to="/coordinator/bookings">My Pickups</Link></li>
                                    </>
                                )}
                                <li className="nav-item d-flex align-items-center me-lg-3">
                                    <span className="text-white-50 small fw-semibold">
                                        {user.username}({user.role})
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="btn btn-warning btn-sm text-dark fw-bold px-3 py-2 mt-1 mt-lg-0">Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item me-lg-3">
                                    <Link className="nav-link text-white fw-semibold" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-warning fw-bold px-4 text-dark shadow-sm mt-2 mt-lg-0" to="/register">Sign Up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
