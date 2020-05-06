import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { useAuth } from '../Login/UseAuth';
const Cart = (props) => {
    const cart = props.cart;
    const auth = useAuth();
    console.log(auth);
    const total = cart.reduce((total, prd) => total + prd.price * prd.quantity , 0);
    let shipping = 0;
    if(total> 200){
        shipping = 0;
    }
    else if(total > 100){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 10.99;
    }
    const tax = total/10;
    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <Container>
            <Row>
                <Col md={12}>
                    <h6>Order Summary</h6>
                    <p> Items Ordered : {cart.length} </p>
                    <p> Shipping Cost : {shipping} </p>
                    <p>Tax : {formatNumber(tax)}</p>
                    <p> Total : {formatNumber(total + shipping + tax)} </p>
                    {
                        props.children
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;