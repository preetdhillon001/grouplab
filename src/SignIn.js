// Parent component or root component
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

function ParentComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Define the SignIn function
  const handleSignIn = (email) => {
    // Perform authentication logic here
    setIsAuthenticated(true);
  };

  return (
    <div>
      <h1>Bank App</h1>
      {/* Pass the SignIn function as a prop to the App component */}
      <App SignIn={handleSignIn} />
    </div>
  );
}

export default ParentComponent;
