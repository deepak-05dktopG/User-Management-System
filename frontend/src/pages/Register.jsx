import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    state: '',
    city: '',
    country: '',
    pincode: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

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
    setSuccess(false);
    setLoading(true);

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      submitData.append(key, formData[key]);
    });
    
    if (profileImage) {
      submitData.append('profile_image', profileImage);
    }

    try {
      await register(submitData);
      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        state: '',
        city: '',
        country: '',
        pincode: ''
      });
      setProfileImage(null);
      setImagePreview(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">User Registration</h2>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success" role="alert">
                  <strong>Success!</strong> Your registration has been completed successfully.
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
                    <label htmlFor="password" className="form-label">
                      Password *
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
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

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </form>

              <div className="text-center mt-3">
                <p className="text-muted mb-0">
                  <small>Admins can login at <Link to="/login">/login</Link></small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
