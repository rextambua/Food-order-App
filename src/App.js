import {useState} from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/Cartprovider";


function App() {
    const [showCartItem, setShowCartItem] = useState(false)

    const showCartHandler = () => {
        setShowCartItem(true)
    }

    const hideCartHandler = () => {
        setShowCartItem(false)
    }


  return (
    <CartProvider>
        { showCartItem && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler} />
        <main>
            <Meals />
        </main>
    </CartProvider>
  );
}

export default App;
