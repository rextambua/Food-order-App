import React, {useContext, useState} from 'react';
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./checkout";

function Cart(props) {
    const [checkout, setCheckout] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [disubmit, setdidSubmit] = useState(false)

    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length>0

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount:1})
    }
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }

    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map((item)=>{
            return (
            <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            />)
        })}
    </ul>

    const orderHandler = () => {
            setCheckout(true)
    }

    const submitOrderHandler = async (userData) => {
        setSubmit(true)
        await fetch( 'https://my-second-project-47d93-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user:userData,
                odereredItems: cartCtx.items
            })
        })
        setSubmit(false)
        setdidSubmit(true)
        cartCtx.clearCart();
    }

    const isSubmittingModalContent = <p>Sending order data...</p>
    const didSubmitModalContent = <React.Fragment>
        <p>Successfully sent order!</p>
        <div className={classes.actions}>
            <button onClick={props.onClose} className={classes['button']}>Close</button>
        </div>
    </React.Fragment>

    const cartModalContent = <React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{ totalAmount }</span></div>
        {checkout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
        {!checkout && <div className={classes.actions}>
            <button onClick={props.onClose} className={classes['button-alt']}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>}
    </React.Fragment>
    return (

        <Modal onClose={props.onClose}>
            {!submit && !disubmit && cartModalContent}
            {submit && isSubmittingModalContent}
            {!submit && disubmit && didSubmitModalContent}
        </Modal>
    );
}

export default Cart;