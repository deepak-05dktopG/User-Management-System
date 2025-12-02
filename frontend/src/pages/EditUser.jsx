import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getUserById, updateUser } from '../services/userService';

const EditUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    city: '',
    country: '',
    pincode: '',
    role: 'user'
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(id);
        const user = data.user;
        setFormData({
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address || '',
          state: user.state,
          city: user.city,
          country: user.country,
          pincode: user.pincode,
          role: user.role
        });
        if (user.profile_image) {
          setImagePreview(`http://localhost:5000${user.profile_image}`);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size must be less than 2MB');
        return;
      }
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      submitData.append(key, formData[key]);
    });

    if (profileImage) {
      submitData.append('profile_image', profileImage);
    }

    try {
      await updateUser(id, submitData);
      navigate(`/users/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user');
    } finally {
      setSubmitting(false);
    }
  };

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

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3>Edit User</h3>
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate('/dashboard')}
                  >
                    Back
                  </button>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">
                        Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="role" className="form-label">
                        Role *
                      </label>
                      <select
                        className="form-control"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    <div className="col-12 mb-3">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <textarea
                        className="form-control"
                        id="address"
                        name="address"
                        rows="2"
                        value={formData.address}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="state" className="form-label">
                        State *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="city" className="form-label">
                        City *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="country" className="form-label">
                        Country *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="pincode" className="form-label">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <label htmlFor="profile_image" className="form-label">
                        Profile Image
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="profile_image"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleImageChange}
                      />
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="image-preview"
                        />
                      )}
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={submitting}
                    >
                      {submitting ? 'Updating...' : 'Update User'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => navigate('/dashboard')}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
