import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container text-center py-5 my-5 custom-min-vh">
            <h1 className="display-1 text-warning fw-bold mb-3" style={{ fontSize: '8rem' }}>404</h1>
            <h2 className="text-primary fw-bold mb-4">Oops! The plate is empty.</h2>
            <p className="lead text-muted mb-5">We couldn't find the page you're looking for. It might have been moved or doesn't exist.</p>
            <Link to="/" className="btn btn-primary btn-lg fw-bold px-4 py-2 shadow-sm">Return Home</Link>
        </div>
    );
};

export default NotFound;
