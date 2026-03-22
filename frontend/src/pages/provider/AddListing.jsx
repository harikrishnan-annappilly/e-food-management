import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createListing } from '../../services/api';

const AddListing = () => {
    const [formData, setFormData] = useState({
        food_type: '', is_veg: true, quantity: '', quantity_unit: 'servings',
        location: '', prepared_time: '', expiry_time: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    let user = {};
    try { user = JSON.parse(localStorage.getItem('user')); } catch (e) { }

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            await createListing({ ...formData, provider: user.id, status: 'active' });
            setMessage('Listing published successfully!');
            setTimeout(() => navigate('/provider/manage-listings'), 1500);
        } catch (err) {
            setMessage('Failed to publish listing. Please check required fields.');
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <h2 className="text-primary fw-bold mb-4">Post Food Donation</h2>
                    <div className="card shadow-sm border-0 p-4">
                        {message && <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}

                        <form onSubmit={handleSubmit}>
                            <h5 className="mb-3 border-bottom pb-2">Food Details</h5>
                            <div className="row g-3">
                                <div className="col-md-8">
                                    <label className="form-label fw-semibold">Food Type / Description</label>
                                    <input type="text" name="food_type" className="form-control" onChange={handleChange} required placeholder="e.g. Wedding Buffet Leftovers" />
                                </div>
                                <div className="col-md-4 d-flex align-items-end">
                                    <div className="form-check form-switch mb-2">
                                        <input className="form-check-input" type="checkbox" name="is_veg" checked={formData.is_veg} onChange={handleChange} />
                                        <label className="form-check-label fw-semibold text-success">Vegetarian Only</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Quantity</label>
                                    <input type="number" name="quantity" className="form-control" onChange={handleChange} required placeholder="50" min="1" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Unit</label>
                                    <select name="quantity_unit" className="form-select" onChange={handleChange}>
                                        <option value="servings">Servings (People)</option>
                                        <option value="kg">Kilograms (kg)</option>
                                        <option value="liters">Liters (L)</option>
                                        <option value="items">Individual Items</option>
                                    </select>
                                </div>
                            </div>

                            <h5 className="mb-3 border-bottom pb-2 mt-4">Timeline & Location</h5>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Time Prepared (Approx)</label>
                                    <input type="datetime-local" name="prepared_time" className="form-control" onChange={handleChange} required />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-danger">Safe Expiry Time</label>
                                    <input type="datetime-local" name="expiry_time" className="form-control" onChange={handleChange} required />
                                </div>
                                <div className="col-12">
                                    <label className="form-label fw-semibold">Pickup Location / Instructions</label>
                                    <input type="text" name="location" className="form-control" onChange={handleChange} required placeholder="Kitchen back door, ask for Manager" />
                                </div>
                            </div>

                            <div className="mt-5 text-end">
                                <button type="submit" disabled={loading} className="btn btn-warning fw-bold px-5 py-2 shadow-sm text-dark">
                                    {loading ? 'Publishing...' : 'Publish Listing'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddListing;
