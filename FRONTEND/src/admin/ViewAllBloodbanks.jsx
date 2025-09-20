import { useEffect, useState } from "react";
import axios from "axios";
import config from "./config";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

export default function ViewAllBloodbanks() {
  const [bloodbanks, setBloodbanks] = useState([]);
  const [error, setError] = useState("");

  const fetchBloodbanks = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/bloodbanks`);
      console.log("Blood banks fetched:", response.data);
      setBloodbanks(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch blood banks. " + err.message);
    }
  };

  useEffect(() => {
    fetchBloodbanks();
  }, []);

  const deleteBloodBank = async (id) => {
    try {
      const response = await axios.delete(`${config.url}/admin/bloodbank/${id}`);
      toast.success(response.data);
      fetchBloodbanks();
    } catch (err) {
      console.error(err);
      toast.error("Deletion failed: " + err.message);
      setError("Unexpected Error: " + err.message);
    }
  };

  return (
    <div className="container my-4">
      <h3 className="text-center fw-bold text-dark">
        <u>View All Blood Banks</u>
      </h3>
      <ToastContainer position="top-center" autoClose={4000} />

      {error && (
        <p className="text-center fs-5 fw-bold text-danger">{error}</p>
      )}

      {bloodbanks.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover mt-3 shadow-sm">
            <thead className="table-primary text-center">
              <tr>
                <th>ID</th>
                <th>Blood Bank Name</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="align-middle text-center">
              {bloodbanks.map((bank) => (
                <tr key={bank.id}>
                  <td>{bank.id}</td>
                  <td>{bank.name}</td>
                  <td>{bank.location}</td>
                  <td>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteBloodBank(bank.id)}
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
            No Blood Bank Data Found
          </p>
        )
      )}
    </div>
  );
}
