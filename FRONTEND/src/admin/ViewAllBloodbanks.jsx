import { useEffect, useState } from "react";
import axios from "axios";
import config from "./config";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewAllBloodbanks() {
  const [bloodbanks, setBloodbanks] = useState([]);
  const [error, setError] = useState("");

  const fetchBloodbanks = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/bloodbanks`);
      console.log("Blood banks fetched:", response.data); // debug
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
      fetchBloodbanks(); // refresh table
    } catch (err) {
      console.error(err);
      toast.error("Deletion failed: " + err.message);
      setError("Unexpected Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ textAlign: "center", color: "black", fontWeight: "bolder" }}>
        <u>View All Blood Banks</u>
      </h3>
      <ToastContainer position="top-center" autoClose={4000} />
      {error && (
        <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>
          {error}
        </p>
      )}
      {bloodbanks.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Blood Bank Name</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bloodbanks.map((bank) => (
              <tr key={bank.id}>
                <td>{bank.id}</td>
                <td>{bank.name}</td>
                <td>{bank.location}</td>
                <td>
                  <Button
                    variant="outlined"
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
      ) : (
        !error && <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>No Blood Bank Data Found</p>
      )}
    </div>
  );
}
