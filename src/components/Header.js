import React from 'react';
import { Jumbotron, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const Header = (props) => {
    return (    
        <Jumbotron style={styles.header}>
            <Row>
                <Col md={4}>
                    <h3>Select a list</h3>
                </Col>
                <Col md={4}>
                    <h3>To Do ({props.remaining})</h3>
                </Col>
                <Col md={4}>
                    <h3>Completed ({props.completed})</h3>
                </Col>                
            </Row>
        </Jumbotron>        
    );
};

const styles = {
    header: {
        backgroundColor: '#424242',
        color: 'white'
    }    
};

export default Header;