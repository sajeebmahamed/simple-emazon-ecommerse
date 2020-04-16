import React from 'react';
import logo from '../../images/logo.png'
import { Container, Row, Col, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
const Header = () => {
    return (
        <Container>
            <Row>
                <Col md={12}>
                    <>
                        <Navbar bg="light" variant="light">
                            <Navbar.Brand href="#">
                                <img width="100px" src={logo} alt=""/>
                            </Navbar.Brand>
                            <Nav className="mr-auto">
                                <Nav.Link href="/shop">Shop</Nav.Link>
                                <Nav.Link href="/review">Order Review</Nav.Link>
                                <Nav.Link href="/inventory">Manage Inventory</Nav.Link>
                            </Nav>
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                <Button variant="outline-info">Search</Button>
                            </Form>
                        </Navbar>
                        <br />
                    </>
                </Col>
            </Row>
        </Container>
    );
};

export default Header;