import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    return (
        <div className="container py-5 my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card p-5 border-0 shadow">
                        <div className="text-center mb-4">
                            <h3 className="text-primary fw-bold">Reset Password</h3>
                            <p className="text-muted">Enter your email address and we'll send you a link to reset your password.</p>
                        </div>
                        <form>
                            <div className="mb-4">
                                <label className="form-label fw-semibold">Email address</label>
                                <input type="email" className="form-control form-control-lg" placeholder="Enter your email" required />
                            </div>
                            <button type="submit" className="btn btn-warning btn-lg w-100 fw-bold text-white mb-3 shadow-sm">Send Reset Link</button>
                            <div className="text-center mt-3">
                                <Link to="/login" className="text-decoration-none text-muted fw-semibold">← Back to Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
