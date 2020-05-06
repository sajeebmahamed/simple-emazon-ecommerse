import React from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap';
import { useState } from 'react';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = (props) => {
    const [products, setProduct] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4200/products')
        .then(res => res.json())
        .then(data => {
            setProduct(data);
        })
    }, [])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        if(products.length) {
            const previousCart = productKeys.map(existingKey => {
                const product = products.find(pd => pd.key === existingKey);
                product.quantity = savedCart[existingKey];
                return product;
            })
            setCart(previousCart);
        }
    }, [products])

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