import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:5000/register', form);
  //     setMessage(response.data.message || 'Registration successful!');
  //     setForm({ username: '', email: '', password: '' });
  //   } catch (error) {
  //     setMessage('Registration failed!',error);
  //   }
  // };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/register', form);
      setMessage(response.data.message || 'Registration successful!');
      setForm({ username: '', email: '', password: '' }); // Clear form on success
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed!'; 
      setMessage(errorMessage);
    }
  };
  

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
