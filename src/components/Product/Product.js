import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    console.log(props);
    const { name, img, seller, stock, price, key } = props.product;
    return (
        <Container>
            <Row>
                <Col md={12} className="product-container">
                    <div>
                        <Image src={img} rounded />
                    </div>
                    <div className="product_des">
                        <Link to={"/product/" + key}>
                            <h6 style={{ color: 'blue' }}> {name} </h6>
                        </Link>
                        <p><small>by : {seller} </small></p>
                        <p> {price} </p>
                        <p><small> only {stock} left in stock - order soon </small></p>
                        { props.showProductBtn &&
                            <Button onClick={() => props.handleAddToCart(props.product)} className="main-btn" variant="warning">
                                <FontAwesomeIcon icon={faCartPlus} /> Add to cart</Button>
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Product;