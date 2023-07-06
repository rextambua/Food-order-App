import {useRef, useState, useEffect} from "react";
import classes from './checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isNotFiveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    })
    const nameRef = useRef()
    const streetRef = useRef()
    const postalRef = useRef()
    const cityRef = useRef()

    const confirmHandler = (event) => {
        event.preventDefault();

        const eneteredName = nameRef.current.value;
        const eneteredStreet = streetRef.current.value;
        const eneteredPostal = postalRef.current.value;
        const eneteredCity = cityRef.current.value;

        const enteredNameIsValid = !isEmpty(eneteredName)
        const enteredStreetIsValid = !isEmpty(eneteredStreet)
        const enteredCityIsValid = !isEmpty(eneteredCity)
        const enteredPostalIsValid = !isNotFiveChars(eneteredPostal)

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalIsValid
        })

        const formIsValid = enteredNameIsValid && enteredCityIsValid && enteredPostalIsValid && enteredStreetIsValid;

        if (!formIsValid) {
            return

        }

    };






    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameRef}/>
                {!formInputValidity.name && <p>Please enter a valid name</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='street'>Address</label>
                <input type='text' id='street' ref={streetRef}/>
                {!formInputValidity.street && <p>Please enter a valid Address</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalRef}/>
                {!formInputValidity.postalCode && <p>Please enter a valid Postal Code</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityRef}/>
                {!formInputValidity.city && <p>Please enter a city name</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;