import { createContext, useContext, useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';

const Context = createContext();
// const showMessage = () => {
//   toast.success('message sent successfully...', {
//     position: toast.POSITION.TOP_CENTER,
//   });
// };

export const AppContext = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState(0);

  let foundCartProduct;
  let productIndex;

  const toggleCart = () => {
    setHidden((prevState) => !prevState);
  };

  const addToCart = (product, quantity) => {
    // Check if the product exist in the cartItems
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    if (product.countInStock < quantity) {
      // showMessage('its not working');
      return;
    }

    setTotalPrice((initial_price) =>
      parseFloat((initial_price + product.price * quantity).toFixed(2))
    );

    setTotalQuantity((initial_qty) => initial_qty + quantity);

    // If the product already exist in the cartItems, increment the price and the quantity
    if (checkProductInCart) {
      // update the cartItems
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });
      setCartItems(updatedCartItems);
    }

    // if the product does not exist in the cart, add the product to cart
    else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
  };

  // Remove product from cart
  const removeCartProduct = (id) => {
    foundCartProduct = cartItems.find((item) => item._id === id);
    productIndex = cartItems.findIndex((item) => item._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);
    setCartItems(newCartItems);
  };

  // increament/decreament the cart quantity
  const changeCartQutantity = (id, value, item) => {
    foundCartProduct = cartItems.find((item) => item._id === id);
    productIndex = cartItems.findIndex((item) => item._id === id);

    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === 'inc') {
      if (item.countInStock < item.quantity + 1) {
        alert('sorry you cant add more');
        return;
      }

      setCartItems([
        ...newCartItems,
        { ...foundCartProduct, quantity: foundCartProduct.quantity + 1 },
      ]);
      setTotalPrice((initial_price) =>
        parseFloat((initial_price + foundCartProduct.price).toFixed(2))
      );
      setTotalQuantity((initial_qty) => initial_qty + 1);
    } else if (value === 'dec') {
      if (foundCartProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundCartProduct, quantity: foundCartProduct.quantity - 1 },
        ]);
        setTotalPrice((initial_price) =>
          parseFloat((initial_price - foundCartProduct.price).toFixed(2))
        );
        setTotalQuantity((initial_qty) => initial_qty - 1);
      }
    }
  };

  const incQty = () => {
    setQuantity((initial_qty) => initial_qty + 1);
  };

  const decQty = () => {
    setQuantity((initial_qty) => {
      if (initial_qty - 1 < 1) return 1;

      return initial_qty - 1;
    });
  };

  const contextValues = {
    hidden,
    setHidden,
    toggleCart,
    cartItems,
    setCartItems,
    totalPrice,
    quantity,
    totalQuantity,
    incQty,
    decQty,
    addToCart,
    changeCartQutantity,
    removeCartProduct,
    // ToastContainer,
  };

  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export const useAppContext = () => useContext(Context);

export default AppContext;
