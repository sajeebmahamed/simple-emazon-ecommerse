import React from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
// import fakeData from '../../fakeData';
const Inventory = () => {
    const addInventor = () => {
        // // const product = fakeData;
        // fetch('http://localhost:4200/addProduct', {
        //     method : 'POST',
        //     headers : {
        //         'Content-Type' : 'application/json'
        //     },
        //     body: JSON.stringify(fakeData)
        // })
        // .then(res => res.json())
        // .then(data => {
        //     console.log('Successfull', data);
        // })
    }
    return (
        <Container>
            <Row>
                <Col md = {12}>
                    <h4>Add Fake Data to mongo</h4>
                    <Button onClick = {addInventor}>Add</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Inventory;