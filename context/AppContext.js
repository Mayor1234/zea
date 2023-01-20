import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, createUserDocumentFromAuth } from '../firebase/firebase';

const Context = createContext();

export const useAppContext = () => useContext(Context);

export const AppContext = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handing the Auth state change of user
  useEffect(() => {
    const unSubscribeFromAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = await createUserDocumentFromAuth(user);
        onSnapshot(userDocRef, (snapShot) => {
          setUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      unSubscribeFromAuth();
    };
  }, []);

  // register user
  const registerUser = (name, email, password) => {
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
      })
      .then((user) => {
        user = auth.currentUser;
        user.providerData.forEach((profile) => {
          console.log('Sign-in provider: ' + profile.providerId);
          console.log('  Provider-specific UID: ' + profile.uid);
          console.log('  Name: ' + profile.displayName);
          console.log('  Email: ' + profile.email);
          console.log('  Photo URL: ' + profile.photoURL);
        });

        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        console.log(errorCode);
      })
      .finally(setLoading(false));
  };

  // Sign in user
  const signInUser = (email, password) => {
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => console.log(user))
      .catch((error) => error.message)
      .finally(setLoading(false));
  };

  // log out user
  const logoutUser = () => {
    signOut(auth);
  };

  // forgot password
  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // ADDING ITEMS TO THE CART__________________________________________________
  let foundCartProduct;
  // let productIndex;

  const toggleCart = () => {
    setHidden((prevState) => !prevState);
  };

  const addToCart = (product, quantity) => {
    // Check if the product exist in the cartItems
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

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
  const removeCartProduct = (product) => {
    foundCartProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    setTotalQuantity((initial_qty) => initial_qty - foundCartProduct.quantity);

    setTotalPrice((initial_price) =>
      parseFloat(
        (
          initial_price -
          foundCartProduct.price * foundCartProduct.quantity
        ).toFixed(2)
      )
    );

    return setCartItems([...newCartItems]);
  };

  // increament/decreament the cart quantity
  const changeCartQutantity = (id, value, item) => {
    foundCartProduct = cartItems.find((item) => item._id === id);
    // productIndex = cartItems.findIndex((item) => item._id === id);

    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === 'inc') {
      if (item.countInStock < item.quantity + 1) return;

      setCartItems([
        ...newCartItems,
        { ...foundCartProduct, quantity: foundCartProduct.quantity + 1 },
      ]);
      setTotalPrice((initial_price) =>
        parseFloat((initial_price + foundCartProduct.price).toFixed(2))
      );
      setTotalQuantity((initial_qty) => initial_qty + 1);
    } else if (value === 'dec') {
      if (foundCartProduct.quantity - 1 < 1) return 1;
      {
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

  const incQty = (product) => {
    if (product.countInStock < quantity + 1) return;

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
    user,
    setUser,
    loading,
    registerUser,
    signInUser,
    logoutUser,
    forgotPassword,
  };

  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export default AppContext;
