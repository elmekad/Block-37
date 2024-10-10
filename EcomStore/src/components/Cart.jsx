import { useState, useEffect } from 'react';
import api from '../services/api';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function fetchCart() {
      const response = await api.get('/api/cart/5');  // use dynamic userId in production
      setCartItems(response.data.items);
    }
    fetchCart();
  }, []);

  const removeFromCart = async (itemId) => {
    await api.delete(`/api/cart/5/${itemId}`);
    setCartItems(cartItems.filter(item => item.productId !== itemId));
  };

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.map(item => (
        <div key={item.productId}>
          <p>Product: {item.productId}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => removeFromCart(item.productId)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
