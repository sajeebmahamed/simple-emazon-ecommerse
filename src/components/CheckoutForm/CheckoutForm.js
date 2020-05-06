import React, { useState } from 'react';
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = (props) => {
    const stripe = useStripe();
    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(null);
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        console.log("stripe integrated", error, paymentMethod);
        if(error){
            setPaymentError(error.message);
            setPaymentSuccess(null);
        }
        else{
            setPaymentSuccess(paymentMethod);
            const payment = {
                id : paymentMethod.id,
                last4 : paymentMethod.card.last4
            }
            props.handlePlaceOrder(payment);
            setPaymentError(null);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
            {
                paymentError && <p style = {{color : 'red'}}> {paymentError} </p>
            }
            {
                paymentSuccess && <p style={{ color: 'green' }}> Payment Successfull </p>
            }
        </form>
    );
};
export default CheckoutForm;