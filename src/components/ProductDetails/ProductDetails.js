import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = (props) => {
    const {productKey} = useParams();
    const product = fakeData.find(product => product.key === productKey);
    console.log(product);
    return (
        <div>
            <Container>
                <Row>
                    <Col md = {12}>
                        <Product showProductBtn = {false} product = {product}></Product>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProductDetails;