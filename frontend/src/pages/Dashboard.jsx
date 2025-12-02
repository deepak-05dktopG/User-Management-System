import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getAllUsers, deleteUser } from '../services/userService';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    state: '',
    city: ''
  });

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers(filters);
      setUsers(data.users);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>User Management Dashboard</h2>
        </div>

        <div className="card shadow mb-4">
          <div className="card-body">
            <form onSubmit={handleSearch}>
              <div className="row g-3">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name or email"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Filter by state"
                    name="state"
                    value={filters.state}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Filter by city"
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-md-2">
                  <button type="submit" className="btn btn-primary w-100">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="card shadow">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Profile</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>State</th>
                      <th>City</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center py-4">
                          No users found
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user._id}>
                          <td>
                            {user.profile_image ? (
                              <img
                                src={`http://localhost:5000${user.profile_image}`}
                                alt={user.name}
                                className="profile-img"
                              />
                            ) : (
                              <div className="profile-img bg-secondary d-flex align-items-center justify-content-center text-white">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.state}</td>
                          <td>{user.city}</td>
                          <td>
                            <span
                              className={`badge ${
                                user.role === 'admin'
                                  ? 'bg-danger'
                                  : 'bg-primary'
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td>
                            <div className="table-actions">
                              <button
                                className="btn btn-sm btn-info"
                                onClick={() => navigate(`/users/${user._id}`)}
                              >
                                View
                              </button>
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => navigate(`/users/edit/${user._id}`)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(user._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
