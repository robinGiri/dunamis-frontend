import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './public/Login';
import { User } from './types';  // Import the User type

const Main = () => {
  const [user, setUser] = useState<User | null>(null);  // Use TypeScript union type for state

  const handleLoginSuccess = (user: User) => {
    setUser(user);
    console.log('Logged in user:', user);
  };

  return (
    <div>
      {!user ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <App />
      )}
    </div>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
