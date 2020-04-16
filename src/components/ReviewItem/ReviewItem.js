import React from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';

const ReviewItem = (props) => {
    const {name, price, quantity, key} = props.product;
    return (
        <Container>
            <Row>
                <Col md = {12}>
                    <h5> {name} </h5>
                    <p>Quantity : {quantity} </p>
                    <p> <small> {price} </small> </p>
                    <Button onClick={() => props.handleRemoveItem(key)} className="main-btn" variant="warning"> Remove </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ReviewItem;