import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import happyImg from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/UseAuth';

const Review = () => {
    const [cart, setCart] = useState([]);
    const auth = useAuth();
    const handleRemoveItem = (productKey) =>{
        console.log("Clicked Hyse", productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    // const [orderPlaced, setOrderedPlaced] = useState(false);
    // const handlePlaceOrder = () => {
    //     setCart([]);
    //     setOrderedPlaced(true);
    //     processOrder();
    // }
    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://emazon-simple.herokuapp.com/getProductsByKey', {
            method : 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => {
            const cartProduct = productKeys.map(key => {
                const product = data.find(pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;
            })
            setCart(cartProduct);
        })
    }, [])
    // let thankYou;
    // if(orderPlaced){
    //     thankYou = <img src = {happyImg} alt = "img" />
    // }

    return (
        <Container>
            <Row>
                <Col md={8}>
                    {
                        cart.map(pd => <ReviewItem handleRemoveItem={handleRemoveItem} key={pd.key} product={pd} ></ReviewItem>)
                    }
                    {
                        !cart.length && <h1> You have not added anything yet. </h1>
                    }
                </Col>
                <Col md={4}>
                    <Cart cart = {cart}>
                        <Link to = "/shipment">
                            {   auth.user ?
                                <Button className="main-btn" variant="warning"> Checkout </Button>
                                :
                                <Button className="main-btn" variant="warning"> Login to Checkout </Button>
                            }
                        </Link>
                    </Cart>
                </Col>
            </Row>
        </Container>
    );
};

export default Review;