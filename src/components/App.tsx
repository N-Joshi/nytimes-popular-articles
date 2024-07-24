import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ArticleDetail from './ArticleDetail';
import ArticlesList from './ArticlesList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
