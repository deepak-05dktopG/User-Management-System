const Unauthorized = () => {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-md-6 text-center">
          <h1 className="display-1">403</h1>
          <h2>Unauthorized Access</h2>
          <p className="lead">You do not have permission to access this page.</p>
          <a href="/login" className="btn btn-primary">
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
