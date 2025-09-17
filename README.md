# MyContacts
FullStack JS Porject

Pré Requis :
- Node.js v18+
- npm v9+
- MongoDB (local ou Atlas)

📂 Structure du projet

monorepo/
├── server/                  # API Node.js / Express
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── routes/
│   ├── server.js
│   └── package.json
├── client/                  # React
│   ├── public/
│   │   ├── index.html
│   │   └── _redirects       # /* /index.html 200 pour Netlify SPA
│   ├── src/
│   │   ├── pages/
│   └── package.json

🛠️ Setup en local

git clone https://github.com/Willstiti/MyContacts.git

🛠️ Setup backend

- cd server
- npm install


⚠️ Crée un fichier .env dans server/ :

MONGODB_URI=<votre MongoDB URI>
JWT_SECRET=<votre secret JWT>

🛠️ Setup frontend

- cd client
- npm install

⚠️ Crée un fichier .env dans client/ :

REACT_APP_API_URL=http://localhost:3500

Endpoints : 
POST	/register	{ email, password }	Crée un nouvel utilisateur
POST	/login	{ email, password }	Connecte un utilisateur
GET	/contact/list	Header: Authorization: Bearer <token>	Récupère tous les contacts
POST	/contact/add	{ firstName, lastName, phoneNumber } + token	Ajoute un contact
PATCH	/contact/:id	{ firstName?, lastName?, phoneNumber? } + token	Modifie un contact
DELETE	/contact/:id	Header: Authorization: Bearer <token>	Supprime un contact

Identifiants test

Email : test@gmail.com

Mot de passe : test

Permet de tester l’application sans créer de compte.