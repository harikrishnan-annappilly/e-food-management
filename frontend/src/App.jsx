import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';

// Provider Pages
import ProviderDashboard from './pages/provider/Dashboard';
import AddListing from './pages/provider/AddListing';
import ManageListings from './pages/provider/ManageListings';
import ProviderHistory from './pages/provider/History';
import ProviderProfile from './pages/provider/Profile';

// Coordinator Pages
import CoordinatorDashboard from './pages/coordinator/Dashboard';
import BrowseFood from './pages/coordinator/BrowseFood';
import ListingDetail from './pages/coordinator/ListingDetail';
import MyBookings from './pages/coordinator/MyBookings';
import CoordinatorProfile from './pages/coordinator/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/Users';
import SystemReports from './pages/admin/Reports';
import GlobalListings from './pages/admin/Listings';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Provider Routes */}
            <Route path="/provider/dashboard" element={<ProviderDashboard />} />
            <Route path="/provider/add-listing" element={<AddListing />} />
            <Route path="/provider/manage-listings" element={<ManageListings />} />
            <Route path="/provider/history" element={<ProviderHistory />} />
            <Route path="/provider/profile" element={<ProviderProfile />} />

            {/* Coordinator Routes */}
            <Route path="/coordinator/dashboard" element={<CoordinatorDashboard />} />
            <Route path="/coordinator/browse" element={<BrowseFood />} />
            <Route path="/coordinator/listing/:id" element={<ListingDetail />} />
            <Route path="/coordinator/bookings" element={<MyBookings />} />
            <Route path="/coordinator/profile" element={<CoordinatorProfile />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/reports" element={<SystemReports />} />
            <Route path="/admin/listings" element={<GlobalListings />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
