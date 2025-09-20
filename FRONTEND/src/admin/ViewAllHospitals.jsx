import { useEffect, useState } from "react";
import axios from "axios";
import config from "./config";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; 

export default function ViewAllHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState("");

  const fetchHospitals = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/hospitals`);
      console.log("Hospitals fetched:", response.data);
      setHospitals(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch hospitals...!!! " + err.message);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const deleteHospital = async (id) => {
    try {
      const response = await axios.delete(`${config.url}/admin/hospital/${id}`);
      toast.success(response.data);
      fetchHospitals();
    } catch (err) {
      console.error(err);
      toast.error("Deletion failed: " + err.message);
      setError("Unexpected Error: " + err.message);
    }
  };

  return (
    <div className="container my-4">
      <h3 className="text-center fw-bold text-dark">
        <u>View All Hospitals</u>
      </h3>
      <ToastContainer position="top-center" autoClose={4000} />
      
      {error && (
        <p className="text-center fs-5 fw-bold text-danger">{error}</p>
      )}

      {hospitals.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover mt-3 shadow-sm">
            <thead className="table-primary text-center">
              <tr>
                <th>ID</th>
                <th>Hospital Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="align-middle text-center">
              {hospitals.map((hospital) => (
                <tr key={hospital.id}>
                  <td>{hospital.id}</td>
                  <td>{hospital.name}</td>
                  <td>{hospital.address}</td>
                  <td>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteHospital(hospital.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !error && (
          <p className="text-center fs-5 fw-bold text-danger">
            No Hospital Data Found
          </p>
        )
      )}
    </div>
  );
}
