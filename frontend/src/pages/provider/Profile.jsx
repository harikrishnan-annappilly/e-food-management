import React from 'react';

const ProviderProfile = () => {
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <h2 className="text-primary fw-bold mb-4">Profile Settings</h2>
                    <div className="card shadow-sm border-0 p-4">
                        <form>
                            <h5 className="mb-3 border-bottom pb-2">Organization Details</h5>
                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Organization Name</label>
                                    <input type="text" className="form-control" defaultValue="Grand Hotel" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">License/Reg Number</label>
                                    <input type="text" className="form-control" defaultValue="REG1234567" disabled />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Contact Person</label>
                                    <input type="text" className="form-control" defaultValue="John Manager" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Email Address</label>
                                    <input type="email" className="form-control" defaultValue="contact@grandhotel.com" disabled />
                                </div>
                                <div className="col-12">
                                    <label className="form-label fw-semibold">Default Pickup Address</label>
                                    <textarea className="form-control" rows="3" defaultValue="Grand Hotel, Main Street, City Center"></textarea>
                                </div>
                            </div>

                            <h5 className="mb-3 border-bottom pb-2 mt-4">Security</h5>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">New Password</label>
                                    <input type="password" className="form-control" placeholder="••••••••" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Confirm New Password</label>
                                    <input type="password" className="form-control" placeholder="••••••••" />
                                </div>
                            </div>

                            <div className="mt-5 text-end">
                                <button type="submit" className="btn btn-primary fw-bold px-4 py-2">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderProfile;
