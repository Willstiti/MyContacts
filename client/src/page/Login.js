const Login = () =>
    {
    return (
    <div>
      <h2>Se connecter</h2>
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
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;