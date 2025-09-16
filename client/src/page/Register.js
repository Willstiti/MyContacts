const Register = () =>
    {
    return (
    <div>
      <h2>Inscription</h2>
      <form>
        <div>
          <label>Email :</label>
          <input
            type="email"
            placeholder="Votre email"
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            placeholder="Votre mot de passe"
            required
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Register;