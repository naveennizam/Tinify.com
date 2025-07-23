/* eslint-disable */

// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Compress from './pages/Compress';
import RemoveBg from './pages/RemoveBg';
// import NotFoundPage from './pages/NotFoundPage'; // Optional 404 page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/compress" element={<Compress />} />
        <Route path="/remove_bg" element={<RemoveBg />} />
        {/* <Route path="*" element={<NotFoundPage />} /> Catch-all for 404 */}
      </Routes>
    </Router>
  );
}

export default App;
/* eslint-disable */
