import React from 'react';
import { Jumbotron, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const Header = ({ list, remaining, completed }) => {
    let display = list != '' ? list : 'select a list';
    
    return (    
        <Jumbotron style={styles.header}>
            <Row>
                <Col md={4}>
                    <h3>{display}</h3>
                    {list == '' &&<span style={{fontSize: 20}}>
                        <i className="glyphicon glyphicon-arrow-down"></i>
                    </span>}
                </Col>
                <Col md={4}>
                    <h3>To Do ({remaining})</h3>
                </Col>
                <Col md={4}>
                    <h3>Completed ({completed})</h3>
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