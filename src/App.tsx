// src/App.tsx
import React from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

const App: React.FC = () => {
  return (
    <div>
      <ProductList />
      <ProductForm />
    </div>
  );
};

export default App;
