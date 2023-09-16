import React from 'react';
import axios from 'axios';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductList from './ProductList';

jest.mock('axios');

describe('ProductList', () => {
  test('should delete a product after adding it', async () => {
    const initialProducts = [
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 },
    ];

    const newProduct = { id: 3, name: 'Product 3', price: 30 };

    axios.get.mockResolvedValueOnce({ data: initialProducts });
    axios.post.mockResolvedValueOnce({ data: newProduct });
    axios.delete.mockResolvedValueOnce();

    render(<ProductList />);

    // Initial products are fetched
    await waitFor(() => {
      expect(screen.getByText('Product 1 - $10')).toBeInTheDocument();
      expect(screen.getByText('Product 2 - $20')).toBeInTheDocument();
    });

    // Add Product button is clicked
    fireEvent.click(screen.getByText('Add Product'));

    // Name and price inputs are filled
    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Product 3' } });
    fireEvent.change(screen.getByLabelText('Price:'), { target: { value: '30' } });

    // Confirm button is clicked
    fireEvent.click(screen.getByText('Confirm'));

    // New product is added to the list
    await waitFor(() => {
      expect(screen.getByText('Product 3 - $30')).toBeInTheDocument();
    });

    // Delete button for the new product is clicked
    const elementsWithText = screen.getAllByText('Delete');

    // Select the last element
    const lastElement = elementsWithText[elementsWithText.length - 1];

    fireEvent.click(lastElement);

    // Deletion is successful and the product is removed from the list
    await waitFor(() => {
      expect(screen.queryByText('Product 3 - $30')).not.toBeInTheDocument();
    });

    // Ensure the delete request was made with the correct product id
    expect(axios.delete).toHaveBeenCalledWith('http://localhost:8000/products/3');
  });
});