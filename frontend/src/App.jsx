import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LayoutBase from './components/LayoutBase';
import PetListPage from './components/PetListPage';
import PetDetailPage from './components/PetDetailPage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <Routes>
      <Route element={<LayoutBase />}>
        <Route path="/" element={<PetListPage />} />
        <Route path="/pets/:id" element={<PetDetailPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Route>
    </Routes>
  );
}

export default App;
