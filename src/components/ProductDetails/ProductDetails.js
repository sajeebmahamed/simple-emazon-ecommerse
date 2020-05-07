import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Product from '../Product/Product';

const ProductDetails = (props) => {
    const {productKey} = useParams();
    const [product, setProduct] = useState(null);
    
    useEffect(() => {
        fetch('https://emazon-simple.herokuapp.com/product/' + productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data);
        })
    }, [])

    return (
        <div>
            <Container>
                <Row>
                    <Col md = {12}>
                        {
                            product && <Product showProductBtn = {false} product = {product}></Product>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProductDetails;