import React from 'react';

const SystemReports = () => {
    return (
        <div className="container py-5 flex-grow-1">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary fw-bold">System Reports</h2>
                <div className="d-flex gap-2">
                    <input type="date" className="form-control" defaultValue="2026-09-01" />
                    <span className="align-self-center text-muted">to</span>
                    <input type="date" className="form-control" defaultValue="2026-10-14" />
                    <button className="btn btn-primary fw-bold px-4">Generate</button>
                </div>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 h-100 p-4">
                        <h5 className="fw-bold mb-3">Food Wastage Saved Over Time (kg)</h5>
                        <div className="bg-light rounded d-flex align-items-center justify-content-center h-100" style={{ minHeight: '300px' }}>
                            <p className="text-muted"><i className="bi bi-bar-chart-fill me-2 fs-4"></i>[Chart.js Render Container]</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card shadow-sm border-0 h-100 p-4">
                        <h5 className="fw-bold mb-3">Active Users by Role</h5>
                        <div className="bg-light rounded d-flex align-items-center justify-content-center h-100" style={{ minHeight: '300px' }}>
                            <p className="text-muted"><i className="bi bi-pie-chart-fill me-2 fs-4"></i>[Chart.js Render Container]</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-end">
                <button className="btn btn-success fw-bold shadow-sm"><i className="bi bi-file-earmark-excel me-2"></i>Export to CSV</button>
                <button className="btn btn-danger fw-bold ms-2 shadow-sm"><i className="bi bi-file-earmark-pdf me-2"></i>Export to PDF</button>
            </div>
        </div>
    );
};

export default SystemReports;
