import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Price from './models/price';
import PriceData from './components/priceData';
import GetId from './components/getId';

function App() {
  return (
    <div className="App">
      <PriceData />
    </div>
  );
}

export default App;
