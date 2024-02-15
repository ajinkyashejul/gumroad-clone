import React from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import { Routes, Route } from 'react-router-dom'; // Add this import

function App() {
  return (
    <div className="App">
      <Header />
      <Routes> {/* Change this part */}
        <Route path="/" element={<Main />} />
        {/* Define other routes here as needed */}
      </Routes>
    </div>
  );
}

export default App;
