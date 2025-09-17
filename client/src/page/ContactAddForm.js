import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

const ContactAddForm = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/contact/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ firstName, lastName, phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.success);
        navigate("/contactList");
      } else {
        alert(data["Error message"]);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <div>
      <h2>Ajouter un contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Prénom :</label>
          <input
            type="text"
            placeholder="Prénom"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            placeholder="Nom"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Numéro de téléphone :</label>
          <input
            type="tel"
            placeholder="Téléphone"
            value={phoneNumber}
            onChange={(e) => setphoneNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default ContactAddForm;