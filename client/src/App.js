import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './page/HomePage';
import Login from './page/Login'
import Register from './page/Register'
import ContactList from './page/ContactList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contactList" element={<ContactList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
