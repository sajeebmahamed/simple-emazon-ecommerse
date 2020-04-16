import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const NoMatch = () => {
    return (
        <Container>
            <Row>
                <Col md = {12}>
                    <p>404! Error. Not Found. Maybe Developer is sleeping :p</p>
                </Col>
            </Row>
        </Container>
    );
};

export default NoMatch;