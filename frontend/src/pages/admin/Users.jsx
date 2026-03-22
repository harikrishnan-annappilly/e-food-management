import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/api';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const { data } = await getUsers();
                setUsers(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllUsers();
    }, []);

    return (
        <div className="container py-5">
            <h2 className="text-primary fw-bold mb-4">User Management</h2>

            <div className="card shadow-sm border-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="px-4">ID</th>
                                <th>Name / Username</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Organization</th>
                                <th className="text-end">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" className="text-center py-4"><div className="spinner-border text-primary" role="status"></div></td></tr>
                            ) : users.length === 0 ? (
                                <tr><td colSpan="6" className="text-center py-4 text-muted">No users found in database.</td></tr>
                            ) : (
                                users.map(u => (
                                    <tr key={u.id}>
                                        <td className="px-4 text-muted small">{u.id}</td>
                                        <td className="fw-semibold">{u.username}</td>
                                        <td>
                                            <span className={`badge ${u.role === 'admin' ? 'bg-danger' : u.role === 'coordinator' ? 'bg-secondary' : 'bg-info text-dark'}`}>
                                                {u.role.toUpperCase()}
                                            </span>
                                        </td>
                                        <td>{u.email}</td>
                                        <td>{u.organization_name || '-'}</td>
                                        <td className="text-end">
                                            <span className="badge bg-success me-2">Active</span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
