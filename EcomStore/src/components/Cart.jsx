import { useState, useEffect } from 'react';
import api from '../services/api';
const { fetchData, deleteData } = api;
import Navbar from '../components/Navbar';
import ProductDetails from './ProductDetails';
import './Cart.css';


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    async function fetchCart() {
      const response = await fetchData(`api/cart/${userId}`);  // use dynamic userId in production
      console.log('Response:', response); // Log the API response
      setCartItems(response);
      console.log('Cart items:', cartItems); // Log the cart items state
    }
    fetchCart();
  }, []);
// ProductDetails();
const userId = localStorage.getItem('userId');
const removeFromCart = async (itemId) => {
  // const userId = localStorage.getItem('userId');
  await deleteData(`api/cart/1/${itemId}`);
  setCartItems(cartItems.filter(item => item.productId !== itemId));
};

  return (
    <div className="containerNav">
      <Navbar />
    <div className="cart">
      {/* <h1>Cart</h1> */}
      {Array.isArray(cartItems.items) && cartItems.items.length > 0 ? (
  cartItems.items.map((item, index) => (
    <div key={index} className="cart-item">
      <ProductDetails id={item.productId} renderImageOnly={true} />
      <p>Product: {item.productName}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => removeFromCart(item.productId)}>Remove</button>
    </div>
  ))
) : (
  <p></p>
)}
    </div>
    </div>
  );
};

export default Cart;
