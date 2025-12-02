import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getUserById } from '../services/userService';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(id);
        setUser(data.user);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3>User Details</h3>
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate('/dashboard')}
                  >
                    Back
                  </button>
                </div>

                <div className="text-center mb-4">
                  {user.profile_image ? (
                    <img
                      src={`http://localhost:5000${user.profile_image}`}
                      alt={user.name}
                      className="profile-img-large"
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                    />
                  ) : (
                    <div className="profile-img-large bg-secondary d-inline-flex align-items-center justify-content-center text-white fs-1">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Name</label>
                    <p className="form-control-plaintext">{user.name}</p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <p className="form-control-plaintext">{user.email}</p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Phone</label>
                    <p className="form-control-plaintext">{user.phone}</p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Role</label>
                    <p className="form-control-plaintext">
                      <span
                        className={`badge ${
                          user.role === 'admin' ? 'bg-danger' : 'bg-primary'
                        }`}
                      >
                        {user.role}
                      </span>
                    </p>
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label fw-bold">Address</label>
                    <p className="form-control-plaintext">
                      {user.address || 'Not provided'}
                    </p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">City</label>
                    <p className="form-control-plaintext">{user.city}</p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">State</label>
                    <p className="form-control-plaintext">{user.state}</p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Country</label>
                    <p className="form-control-plaintext">{user.country}</p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Pincode</label>
                    <p className="form-control-plaintext">{user.pincode}</p>
                  </div>
                </div>

                <div className="d-flex gap-2 mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/users/edit/${user._id}`)}
                  >
                    Edit User
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/dashboard')}
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
