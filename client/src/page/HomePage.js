import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Bienvenue sur MyContact</h1>
      <div>
        <Link to="/login">
          <button>Se connecter</button>
        </Link>

        <Link to="/register">
          <button>S'inscrire</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;