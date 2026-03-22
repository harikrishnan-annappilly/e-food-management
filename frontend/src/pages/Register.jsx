import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, loginUser, getCurrentUser } from '../services/api';

const Register = () => {
    const [activeTab, setActiveTab] = useState('provider');
    const [formData, setFormData] = useState({
        username: '', email: '', password: '', organization_name: '', license_number: '', address: '', contact_person: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const payload = { ...formData, role: activeTab };

        try {
            // Register
            await registerUser(payload);

            // Auto Login
            const { data } = await loginUser({ username: formData.username, password: formData.password });
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            const userRes = await getCurrentUser();
            localStorage.setItem('user', JSON.stringify(userRes.data));

            if (activeTab === 'coordinator') navigate('/coordinator/dashboard');
            else navigate('/provider/dashboard');

            window.location.reload();
        } catch (err) {
            setError(err.response?.data?.username ? 'Username already exists.' : 'Registration failed. Please check your inputs.');
            setLoading(false);
        }
    };

    return (
        <div className="container py-5 my-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-7">
                    <div className="card border-0 shadow-lg overflow-hidden">
                        <div className="p-5">
                            <div className="text-center mb-4">
                                <h2 className="text-primary fw-bold">Create an Account</h2>
                                <p className="text-muted">Join our community and make a difference today.</p>
                            </div>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <ul className="nav nav-tabs nav-fill mb-4">
                                <li className="nav-item">
                                    <button
                                        className={`nav-link fw-bold ${activeTab === 'provider' ? 'active text-primary' : 'text-muted'}`}
                                        onClick={() => setActiveTab('provider')}
                                    >
                                        Hotel / Provider
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link fw-bold ${activeTab === 'coordinator' ? 'active text-primary' : 'text-muted'}`}
                                        onClick={() => setActiveTab('coordinator')}
                                    >
                                        NGO / Coordinator
                                    </button>
                                </li>
                            </ul>

                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-semibold">Username</label>
                                        <input type="text" name="username" className="form-control" onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-semibold">Email Address</label>
                                        <input type="email" name="email" className="form-control" onChange={handleChange} required />
                                    </div>

                                    {activeTab === 'provider' ? (
                                        <>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">Organization Name</label>
                                                <input type="text" name="organization_name" className="form-control" onChange={handleChange} required />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">License/Reg Number</label>
                                                <input type="text" name="license_number" className="form-control" onChange={handleChange} required />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold">Contact Person</label>
                                                <input type="text" name="contact_person" className="form-control" onChange={handleChange} required />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-semibold">NGO Name</label>
                                                <input type="text" name="organization_name" className="form-control" onChange={handleChange} required />
                                            </div>
                                        </>
                                    )}
                                    <div className="col-12 mb-3">
                                        <label className="form-label fw-semibold">Base Address</label>
                                        <input type="text" name="address" className="form-control" onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <label className="form-label fw-semibold">Password</label>
                                        <input type="password" name="password" className="form-control" onChange={handleChange} required />
                                    </div>
                                </div>

                                <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-100 fw-bold shadow-sm">
                                    {loading ? 'Processing...' : `Register as ${activeTab === 'provider' ? 'Provider' : 'Coordinator'}`}
                                </button>
                            </form>
                        </div>
                        <div className="card-footer bg-light text-center py-3 border-0">
                            <p className="mb-0 text-muted">Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Login here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
