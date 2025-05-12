import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTournament } from "../../backend/adminMethod";

interface FormData {
  name: string;
  startDate: string;
  endDate: string;
}

function AddTournament() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addTournament(formData.name, formData.startDate, formData.endDate);
      alert("Tournament added successfully!");
      setFormData({ name: "", startDate: "", endDate: "" });
    } catch (error) {
      console.error("Failed to add tournament:", error);
      alert("Error adding tournament. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Tournament</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Enter Tournament Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <label>
          <h2>Enter Start Date</h2>
        </label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <label>
          <h2>Enter End Date</h2>
        </label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.button}>
            Add Tournament
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin")}
            style={styles.backButton}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "500px",
    margin: "auto",
    padding: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  backButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#ccc",
    color: "black",
    border: "none",
    cursor: "pointer",
  },
};

export default AddTournament;
