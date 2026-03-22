import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, getCurrentUser } from '../services/api';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { data } = await loginUser(credentials);
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            // fetch user profile
            const userRes = await getCurrentUser();
            const user = userRes.data;
            localStorage.setItem('user', JSON.stringify(user));

            if (user.role === 'admin') navigate('/admin/dashboard');
            else if (user.role === 'coordinator') navigate('/coordinator/dashboard');
            else navigate('/provider/dashboard');

            window.location.reload();
        } catch (err) {
            setError('Invalid username or password.');
            setLoading(false);
        }
    };

    return (
        <div className="container py-5 my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card p-5 border-0 shadow">
                        <div className="text-center mb-4">
                            <h3 className="text-primary fw-bold">Welcome Back</h3>
                            <p className="text-muted">Login to manage your surplus sharing.</p>
                        </div>

                        {error && <div className="alert alert-danger">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control form-control-lg"
                                    placeholder="Enter your username"
                                    value={credentials.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-semibold">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control form-control-lg"
                                    placeholder="••••••••"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="d-flex justify-content-between mb-4 align-items-center">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="remember" />
                                    <label htmlFor="remember" className="form-check-label text-muted small">Remember me</label>
                                </div>
                                <Link to="/forgot-password" className="text-decoration-none small text-warning fw-semibold">Forgot Password?</Link>
                            </div>
                            <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-100 fw-bold">
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                        <div className="text-center mt-4 pt-3 border-top">
                            <p className="text-muted mb-0">Don't have an account? <Link to="/register" className="text-decoration-none fw-bold text-primary">Sign Up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
