// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Analyzer from './pages/Analyzer';
import VulnerabilityReport from './pages/VulnerabilityReport';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyzer" element={<Analyzer />} />
        <Route path="/VulnerabilityReport/:name/:code/:output/:description" element={<VulnerabilityReport />} />
                
      </Routes>
    </Router>
  );
};

export default App;