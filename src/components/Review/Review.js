import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Container, Row, Col, Button } from 'react-bootstrap';
import happyImg from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const handleRemoveItem = (productKey) =>{
        console.log("Clicked Hyse", productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    const [orderPlaced, setOrderedPlaced] = useState(false);
    const handlePlaceOrder = () => {
        setCart([]);
        setOrderedPlaced(true);
        processOrder();
    }
    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProduct = productKeys.map(key =>{
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        })
        setCart(cartProduct);
    }, [])
    let thankYou;
    if(orderPlaced){
        thankYou = <img src = {happyImg} alt = "img" />
    }

    return (
        <Container>
            <Row>
                <Col md={8}>
                    {
                        cart.map(pd => <ReviewItem handleRemoveItem={handleRemoveItem} key={pd.key} product={pd} ></ReviewItem>)
                    }
                    {
                        thankYou
                    }
                </Col>
                <Col md={4}>
                    <Cart cart = {cart}>
                        <Button onClick = {handlePlaceOrder} className="main-btn" variant="warning"> Place Order </Button>
                    </Cart>
                </Col>
            </Row>
        </Container>
    );
};

export default Review;