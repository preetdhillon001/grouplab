import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Transaction from './Transaction';
import logo from './AIRBANK logo.png'; 

function App({ onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    accountNumber: '',
    amount: 0
  });
  const [accountBalances, setAccountBalances] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sign-in functionality
    if (email === 'example@example.com' && password === 'password') {
      onSignIn(email);
    } else {
      setError('Invalid email or password');
    }
  };

  // Function to handle transaction submission
  const handleTransaction = () => {
    const { type, accountNumber, amount } = formData;

    if (type && accountNumber && amount > 0) {
      const newTransaction = {
        type,
        accountNumber,
        amount,
        timestamp: new Date().toLocaleString()
      };

      // Update transactions
      setTransactions([...transactions, newTransaction]);

      // Update account balance based on transaction type
      const updatedBalance = (accountBalances[accountNumber] || 0) + (type === 'Deposit' ? amount : -amount);
      setAccountBalances({ ...accountBalances, [accountNumber]: updatedBalance });

      // Reset form data
      setFormData({ type: '', accountNumber: '', amount: 0 });
    } else {
      alert('Please fill out all fields correctly.');
    }
  };

  return (

   <div className="container mt-5" style={{ backgroundImage: "red"  }}>
    <a href="/"> {/* Wrap the logo with an anchor tag */}
          <img src={logo} alt="AIRBANK logo.png" className="mb-4" /> {/* Add your logo */}
        </a>
    
       
        <h4 className="text-primary">AIRBANK</h4>

      <div className="border p-4"> {/* Add border and padding */}
        <form onSubmit={handleSubmit} className="signin-form">
          <h2>Sign In</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button className="btn btn-primary" type="submit">Sign In</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
  
      <div className="row mt-5">
        <div className="col-md-6">
          <h2>Bank Transactions</h2>
          <button
            className="btn btn-primary mr-2"
            onClick={() => setFormData({ type: 'Deposit', accountNumber: '', amount: 0 })}
          >
            Deposit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setFormData({ type: 'Withdrawal', accountNumber: '', amount: 0 })}
          >
            Withdraw
          </button>
        </div>
      </div>
  
      {formData.type && (
        <div className="mt-3">
          <h3>{formData.type} Form</h3>
          <div className="form-group">
            <label>Account Number:</label>
            <input
              type="text"
              className="form-control"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              className="form-control"
              name="amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
            />
          </div>
          <button className="btn btn-primary" onClick={handleTransaction}>
            {formData.type}
          </button>
        </div>
      )}
  
      <Transaction transactions={transactions} accountBalances={accountBalances} />
    </div>
  );
  
}

export default App;
