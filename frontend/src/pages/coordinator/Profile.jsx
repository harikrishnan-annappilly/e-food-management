import React from 'react';

const CoordinatorProfile = () => {
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <h2 className="text-primary fw-bold mb-4">Profile Settings</h2>
                    <div className="card shadow-sm border-0 p-4">
                        <form>
                            <h5 className="mb-3 border-bottom pb-2">NGO / Volunteer Details</h5>
                            <div className="row g-3 mb-4">
                                <div className="col-12">
                                    <label className="form-label fw-semibold">NGO / Individual Name</label>
                                    <input type="text" className="form-control" defaultValue="Hope Foundation" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Contact Email</label>
                                    <input type="email" className="form-control" defaultValue="contact@hopefoundation.org" disabled />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">ID Proof Verification Status</label>
                                    <div className="mt-2">
                                        <span className="badge bg-success p-2"><i className="bi bi-shield-check me-1"></i> Verified</span>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label fw-semibold">Distribution Address / Base Location</label>
                                    <textarea className="form-control" rows="3" defaultValue="Hope Shelter, 45 North Avenue"></textarea>
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

export default CoordinatorProfile;
