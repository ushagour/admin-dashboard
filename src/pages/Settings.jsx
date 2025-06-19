import "bootstrap/dist/css/bootstrap.min.css";

export default function Settings() {
  return (
    <div className="flex-grow-1">
      <div className="container-fluid p-4">
        <h2 className="mb-4">Settings</h2>
        <div className="card mb-4">
          <div className="card-body">
            {/* Example settings form */}
            <form>
              <div className="mb-3">
                <label htmlFor="siteName" className="form-label">Site Name</label>
                <input type="text" className="form-control" id="siteName" placeholder="Enter site name" />
              </div>
              <div className="mb-3">
                <label htmlFor="adminEmail" className="form-label">Admin Email</label>
                <input type="email" className="form-control" id="adminEmail" placeholder="Enter admin email" />
              </div>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}