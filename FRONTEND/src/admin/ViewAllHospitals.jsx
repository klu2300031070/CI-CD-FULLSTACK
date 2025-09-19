import { useEffect, useState } from "react";
import axios from "axios";
import config from "./config";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewAllHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState("");

  const fetchHospitals = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/hospitals`);
      console.log("Hospitals fetched:", response.data); // debug
      setHospitals(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch hospitals. " + err.message);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const deleteHospital = async (id) => {
    try {
      const response = await axios.delete(`${config.url}/admin/hospital/${id}`);
      toast.success(response.data);
      fetchHospitals(); // refresh table
    } catch (err) {
      console.error(err);
      toast.error("Deletion failed: " + err.message);
      setError("Unexpected Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ textAlign: "center", color: "black", fontWeight: "bolder" }}>
        <u>View All Hospitals</u>
      </h3>
      <ToastContainer position="top-center" autoClose={4000} />
      {error && (
        <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>
          {error}
        </p>
      )}
      {hospitals.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Hospital Name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map((hospital) => (
              <tr key={hospital.id}>
                <td>{hospital.id}</td>
                <td>{hospital.name}</td>
                <td>{hospital.address}</td>
                <td>
                  <Button
                    variant="outlined"
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
      ) : (
        !error && <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>No Hospital Data Found</p>
      )}
    </div>
  );
}
