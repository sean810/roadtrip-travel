import React, { useState } from 'react';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { name, email, password };

    try {
      const response = await fetch('http://localhost:5000/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Error creating user');
      } else {
        const data = await response.json();
        console.log('User created:', data);
        // Optionally, you can redirect the user or show a success message
      }
    } catch (err) {
      setError('Error creating user');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>{error}</p>} {/* Display error if any */}
    </div>
  );
}

export default SignUp;
