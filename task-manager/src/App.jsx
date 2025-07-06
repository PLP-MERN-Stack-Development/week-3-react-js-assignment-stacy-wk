import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TaskManagerPage from './pages/TaskManagerPage';
import PostsPage from './pages/PostsPage'; 

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/tasks" element={<TaskManagerPage />} />
        <Route path="/posts" element={<PostsPage />} /> 
      </Routes>
    </Layout>
  );
}

export default App;