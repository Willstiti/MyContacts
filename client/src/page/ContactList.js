import { useEffect, useState } from "react";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
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
          alert(data.success);
        } else {
          alert(data["Error message"]);
        }
      } catch (err) {
        console.error("Erreur réseau :", err);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div>
      <h2>Mes contacts</h2>
      {contacts.length === 0 ? (
        <p>Aucun contact enregistré</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact._id}>
              {contact.nom} - {contact.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
