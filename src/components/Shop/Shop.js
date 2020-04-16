import React from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap';
import fakeData from '../../fakeData';
import { useState } from 'react';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = (props) => {
    console.log(props);
    const data = fakeData.slice(0,10);
    const [products, setProduct] = useState(data);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        } )
        setCart(previousCart);
    }, [])

    const handleAddToCart = (product) =>{
        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    console.log(cart);
    return (
        <Container>
            <Row>
                <Col md={8}>
                    {
                        products.map(product => <Product key = {product.key} showProductBtn={true} handleAddToCart={handleAddToCart} product = {product}></Product>)
                    }
                </Col>
                <Col md={4}>
                   <Cart cart = {cart}>
                        <Link to="/review">
                            <Button className="main-btn" variant="warning"> Order Review </Button>
                        </Link>
                   </Cart>
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;