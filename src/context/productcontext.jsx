import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/productReducer";

const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureproducts: [],
  isSingleLoading: false,
  singleProduct: {},
};

const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const products = await res.data;
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });

    }
  };

  // 2nd API For Single poduct page

  const getSingleProducts = async (url) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const res = await axios.get(url);
      const SingleProducts = await res.data;
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: SingleProducts });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });

    }
  };


  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getSingleProducts }}>
      {children}
    </AppContext.Provider>
  );

};

// custom hooks

const useProductContext = () => {
  return useContext(AppContext);
};


export { AppProvider, AppContext, useProductContext };