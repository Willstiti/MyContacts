import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  
  const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3500/contact/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        const data = await response.json();

        if (response.ok) {
          setContacts(data);
        } else {
          alert(data["Error message"]);
        }
      } catch (err) {
        console.error("Erreur réseau :", err);
      }
    };
  
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3500/contact/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        fetchContacts();
      } else {
        alert(data["Error message"]);
      }
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editcontact/${id}`);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <h2>Mes contacts</h2>
      <Link to="/addcontact">
          <button>Ajouter un contact</button>
      </Link>
      {contacts.length === 0 ? (
        <p>Aucun contact enregistré</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact._id}>
              {contact.firstName} - {contact.lastName} : {contact.phoneNumber}
              <button onClick={() => handleEdit(contact._id)}>Éditer</button>
              <button onClick={() => handleDelete(contact._id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
