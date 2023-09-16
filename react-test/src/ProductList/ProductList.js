import React, { useState, useEffect } from 'react';
import './ProductList.css';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: 0 });

  // Fetch products from API endpoint on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/products');
        setProducts(response.data);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  // Function to delete a product
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.log('Error deleting product:', error);
    }
  };

  // Function to handle form submission for adding a new product
  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const addedProduct = await axios.post('http://localhost:8000/products', newProduct);
      setProducts([...products, addedProduct.data]);
      setNewProduct({ name: '', price: 0 });
      setShowModal(false);
    } catch (error) {
      console.log('Error adding product:', error);
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <button onClick={() => setShowModal(true)}>Add Product</button>

      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <span>{product.name} - ${product.price}</span>
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <div className='modal-container'>
          <div className='modal-content'>
          <h3 className='modal-title'>Add Product</h3>
          <form className='modal-form' onSubmit={addProduct}>
            <label>
              Name:
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </label>
            <div className="modal-buttons">
              <button type="submit">Confirm</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </form>
        </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;