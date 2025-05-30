import { useEffect, useState } from 'react';
import api from '../../api';
import AdminNav from '../../components/AdminNav';
import { FiTrash2, FiUser, FiUserCheck, FiShield, FiCheckCircle } from 'react-icons/fi';
import { RiAdminLine } from 'react-icons/ri';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const roleIcons = {
    admin: <RiAdminLine className="role-icon admin" />,
    supplier: <FiUserCheck className="role-icon supplier" />,
    customer: <FiUser className="role-icon customer" />
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      alert('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  const approveSupplier = async (id) => {
    try {
      await api.put(`/admin/suppliers/approve/${id}`);
      fetchUsers();
    } catch (err) {
      alert('Failed to approve supplier');
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-dashboard-users">
      <AdminNav />

      <div className="admin-container-users">
        <div className="admin-header-users">
          <div>
            <h1 className="admin-title">User Management</h1>
            <p className="admin-subtitle">Manage all user accounts in the system</p>
          </div>
          <div className="search-box-users">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="empty-state">
            <FiUser className="empty-icon" />
            <p>{searchTerm ? 'No matching users found' : 'No users found'}</p>
          </div>
        ) : (
          <div className="users-table">
            <div className="table-header">
              <div className="header-cell name">User</div>
              <div className="header-cell email">Email</div>
              <div className="header-cell role">Role</div>
              <div className="header-cell actions">Actions</div>
            </div>

            <div className="table-body">
              {filteredUsers.map(user => (
                <div className="user-row" key={user._id}>
                  <div className="user-cell name">
                    <div className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-details">
                      <div className="user-name">{user.name}</div>
                      <div className="user-id">ID: {user._id.slice(-6)}</div>
                    </div>
                  </div>

                  <div className="user-cell email">{user.email}</div>

                  <div className="user-cell role">
                    <div className={`role-badge ${user.role}`}>
                      {roleIcons[user.role]}
                      <span>
                        {user.role}
                        {user.role === 'supplier' && !user.isApproved && ' (Pending)'}
                      </span>
                    </div>
                  </div>

                  <div className="user-cell actions">
                    {user.role !== 'admin' && (
                      <>
                        {!user.isApproved && user.role === 'supplier' && (
                          <button
                            className="approve-btn"
                            onClick={() => approveSupplier(user._id)}
                          >
                            <FiCheckCircle /> Approve
                          </button>
                        )}
                        <button
                          className="delete-btn"
                          onClick={() => deleteUser(user._id)}
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
