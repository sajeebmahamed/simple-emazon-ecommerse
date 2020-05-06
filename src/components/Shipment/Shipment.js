import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useAuth } from '../Login/UseAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm()
    const auth = useAuth();
    const stripePromise = loadStripe('pk_test_BPZRRegJm0Y8KuX7nBElSfpq00hLnSTszJ');
    const [shipInfo, setShipInfo] = useState(null);
    const [orderId, setorderId] = useState(null);
    const onSubmit = data => {
        setShipInfo(data);
    }
    const handlePlaceOrder = (payment) => {
        const savedCart = getDatabaseCart();
        const orderDetail = {
            email: auth.user.email,
            cart: savedCart,
            shipmentAddress: shipInfo,
            payment: payment
        };
        fetch('http://localhost:4200/placeOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetail)
        })
            .then(res => res.json())
            .then(order => {
                setorderId(order._id);
                processOrder();
            })
    }
    return (
        <Container>
            <Row>
                <Col style = {{display : shipInfo && 'none'}} md={6}>
                    <form className = "ship-form" onSubmit={handleSubmit(onSubmit)}>

                        <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Please Enter Your Name" />
                        {errors.name && <span>Username is required</span>}

                        <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Please Enter Your Email" />
                        {errors.email && <span>Email is required</span>}

                        <input name="address" ref={register({ required: true })} placeholder="Please Enter Your Address" />
                        {errors.address && <span>Address is required</span>}

                        <input name="city" ref={register({ required: true })} placeholder="Please Enter Your City" />
                        {errors.city && <span>City is required</span>}

                        <input name="zipcode" ref={register({ required: true })} placeholder="Please Enter Your Zip Code" />
                        {errors.zipcode && <span>Zip Code is required</span>}

                        <input type="submit" />
                    </form>
                </Col>
                <Col style={{ display: shipInfo ? 'block' : 'none' }} md={6}>
                    <h3>Payment Information</h3>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
                    </Elements>
                    <br/>
                    {
                        orderId && <p>Thank you and your order id is : {orderId} </p>
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default Shipment;