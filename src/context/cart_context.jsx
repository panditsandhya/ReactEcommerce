import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from '../reducer/cartReducer';

const CartContext = createContext();

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("productCart");
//   if(localCartData == []) {
//     return [];
// }else{
//     return JSON.parse(localCartData);
// }

const parsedData = JSON.parse(localCartData);
if(!Array.isArray(parsedData)) return[];
return parsedData;

};

const initialState = {
  // cart: [],
  cart: getLocalCartData(),
  total_item: "",
  total_price: "",
  shipping_price: 5000,

};

const CartProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });

  };

  // Increment and Decrement product

  const setDecrease = (id) => {
    dispatch({type: "SET_DECREMENT", payload: id});
  }

  const setIncrease= (id) => {
    dispatch({type: "SET_INCREMENT", payload: id});
  }

  // To remove the individual item from cart
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };
 
  // To clear the cart 
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART"});
  };

  
  // To add the data in localStorage
  // set
  useEffect(() => {
    // dispatch({ type: "CART_TOTAL_ITEM" });
    // dispatch({ type: "CART_TOTAL_PRICE"});
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });
    localStorage.setItem("productCart", JSON.stringify(state.cart));
  }, [state.cart]);


  return (
    <CartContext.Provider
     value={{ 
      ...state, 
      addToCart, 
      removeItem, 
      clearCart,
      setIncrease,
      setDecrease
      }}>
    {children}
  </CartContext.Provider>
  )

};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
