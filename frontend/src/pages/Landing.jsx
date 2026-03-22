import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div>
            <div className="hero-section">
                <div className="container">
                    <h1 className="display-4 fw-bold mb-4">Share the Surplus, Feed the Future</h1>
                    <p className="lead mb-5">Join our platform to minimize food wastage by directly connecting providers with local coordinators.</p>
                    <Link to="/register" className="btn btn-warning btn-lg me-3 fw-bold shadow-sm">Join as Provider</Link>
                    <Link to="/register" className="btn btn-outline-light btn-lg fw-bold shadow-sm">Join as Coordinator</Link>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="container my-5 py-5 text-center">
                <h2 className="mb-5 text-primary fw-bold">How It Works</h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card h-100 p-4">
                            <h1 className="text-warning display-4 fw-bold">1</h1>
                            <h4 className="mt-3">Post Surplus Food</h4>
                            <p className="text-muted mt-2">Hotels and event managers list their excess untouched food effortlessly.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 p-4">
                            <h1 className="text-warning display-4 fw-bold">2</h1>
                            <h4 className="mt-3">Coordinators Browse</h4>
                            <p className="text-muted mt-2">NGOs and verified volunteers find nearby available food for pickup.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 p-4">
                            <h1 className="text-warning display-4 fw-bold">3</h1>
                            <h4 className="mt-3">Food is Collected</h4>
                            <p className="text-muted mt-2">Food is safely transported to those in need, eliminating waste.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Impact Section */}
            <div className="bg-primary text-white py-5 text-center shadow-inner">
                <div className="container py-4">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <h2 className="display-4 fw-bold text-warning">10k+</h2>
                            <p className="lead mb-0">Meals Saved</p>
                        </div>
                        <div className="col-md-4">
                            <h2 className="display-4 fw-bold text-warning">500+</h2>
                            <p className="lead mb-0">Active Coordinators</p>
                        </div>
                        <div className="col-md-4">
                            <h2 className="display-4 fw-bold text-warning">120+</h2>
                            <p className="lead mb-0">Partner Hotels</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
