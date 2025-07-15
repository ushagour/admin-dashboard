import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { fetchCategories } from "../api/api";


export default function Categories() {



  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchCategories().then(data => setCategories(data)).catch(console.error)
  }, [])
  
  return (
    <div className="flex-grow-1">
      <div className="container-fluid p-4">
        <h2 className="mb-4">Categories</h2>
        <div className="card mb-4">
          <div className="card-body">

            {/*  add new form  */}
            <form>
              <div className="mb-3">
                <label htmlFor="categoryName" className="form-label">Category Name</label>
                <input type="text" className="form-control" id="categoryName" placeholder="Enter category name" />
              </div>
              <div className="mb-3">
                <label htmlFor="categoryDescription" className="form-label">icon</label>
                <input type="text" className="form-control" id="icon" placeholder="Enter category icon" />

              </div>
              <button type="submit" className="btn btn-primary">Add Category</button>
            </form> 
            {/*  end of add new form  */}



            {/*  show all categories */}
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Category ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Icon</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map through categories and display them here */}
                  {/* Example row */}
                                      {categories.map((category) => (

                      <tr key={category.id}>
                        <td>{category.id}</td>  
                        <td>{category.name}</td>
                        <td>
                          <i className={`bi ${category.icon}`} style={{ fontSize: "1.5rem" }}></i>
                        </td>
      
                    <td>
                      <button className="btn btn-sm btn-primary me-2">Edit</button>
                      <button className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                    ))}
                </tbody>
              </table>


      
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}