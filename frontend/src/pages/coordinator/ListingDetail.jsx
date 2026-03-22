import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getListing, createBooking, updateListing } from '../../services/api';

const ListingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const { data } = await getListing(id);
                setListing(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    const handleBook = async () => {
        setBooking(true);
        try {
            let user = JSON.parse(localStorage.getItem('user'));
            // Create the booking record
            await createBooking({ listing: id, coordinator: user.id, status: 'pending_pickup' });
            // Update listing status
            await updateListing(id, { status: 'booked' });
            // Go to bookings page
            navigate('/coordinator/bookings');
        } catch (err) {
            console.error('Error booking listing:', err);
            alert("Failed to book listing.");
            setBooking(false);
        }
    };

    if (loading) return <div className="text-center py-5 mt-5"><div className="spinner-border text-primary" role="status"></div></div>;
    if (!listing) return <div className="container py-5 text-center mt-5"><h3>Listing not found </h3><Link to="/coordinator/browse">Go Back</Link></div>;

    return (
        <div className="container py-5 my-4">
            <Link to="/coordinator/browse" className="text-decoration-none text-muted mb-4 d-inline-block">← Back to Listings</Link>

            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-lg overflow-hidden">
                        <div className={`bg-${listing.is_veg ? 'success' : 'danger'} text-white p-4`}>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="badge bg-white text-dark fw-bold">{listing.is_veg ? 'Vegetarian' : 'Non-Vegetarian'}</span>
                            </div>
                            <h2 className="fw-bold mb-0">{listing.food_type}</h2>
                        </div>

                        <div className="card-body p-5">
                            <div className="row mb-5">
                                <div className="col-md-6 border-end">
                                    <h5 className="text-muted fw-semibold mb-3">Provider Details</h5>
                                    <p className="mb-1"><i className="bi bi-shop me-2 text-primary"></i><strong>{listing.provider_org || `Provider #${listing.provider}`}</strong></p>
                                    <p className="mb-1"><i className="bi bi-geo-alt me-2 text-primary"></i>{listing.location}</p>
                                </div>
                                <div className="col-md-6 ps-md-4 mt-4 mt-md-0">
                                    <h5 className="text-muted fw-semibold mb-3">Food Details</h5>
                                    <p className="mb-1"><strong>Quantity:</strong> {listing.quantity} {listing.quantity_unit}</p>
                                    <p className="mb-1"><strong>Prepared Time:</strong> {new Date(listing.prepared_time).toLocaleString()}</p>
                                    <p className="mb-1 text-danger"><strong>Expiry Time:</strong> {new Date(listing.expiry_time).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="alert alert-warning border-start border-warning border-4 mb-4">
                                <h6 className="fw-bold"><i className="bi bi-exclamation-triangle-fill me-2"></i>Safety Disclaimer</h6>
                                <p className="mb-0 small">As a coordinator, you agree to follow proper food safety protocols during transportation and distribution.</p>
                            </div>

                            <button onClick={handleBook} disabled={booking || listing.status !== 'active'} className={`btn ${listing.status !== 'active' ? 'btn-secondary' : 'btn-primary'} btn-lg w-100 fw-bold shadow-sm py-3`}>
                                {booking ? 'Processing Booking...' : listing.status !== 'active' ? 'Already Claimed/Expired' : 'Confirm Booking & Claim Food'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingDetail;
