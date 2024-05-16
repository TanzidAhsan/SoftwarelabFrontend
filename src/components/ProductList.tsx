// src/components/ProductList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Corrected import path

const ProductList: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null); // Added type annotation to handle possible null
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedQuantity, setEditedQuantity] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEditClick = (product: any) => {
    setSelectedProduct(product);
    setEditedName(product.name);
    setEditedPrice(product.price);
    setEditedQuantity(product.quantity);
    setIsModalOpen(true);
  };

  const handleSaveChanges = async () => {
    if (!selectedProduct) return; // Added null check
    try {
      await axios.put(`http://localhost:3000/products/${selectedProduct.id}`, {
        name: editedName,
        price: editedPrice,
        quantity: editedQuantity,
      });
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>
            {product.name} - ${product.price} - Quantity: {product.quantity}
            <button onClick={() => handleEditClick(product)}>Edit</button>
          </li>
        ))}
      </ul>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Edit Product</h2>
        <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
        <input type="text" value={editedPrice} onChange={(e) => setEditedPrice(e.target.value)} />
        <input type="text" value={editedQuantity} onChange={(e) => setEditedQuantity(e.target.value)} />
        <button onClick={handleSaveChanges}>Save Changes</button>
      </Modal>
    </div>
  );
};

export default ProductList;
