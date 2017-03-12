import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Grid, Row, Col } from 'react-bootstrap';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import Header from './Header';
//import IconButton from 'material-ui/IconButton';
import 'bootstrap/dist/css/bootstrap.css';
import 'material-design-icons/iconfont/material-icons.css';

@inject('todos') @observer
class App extends Component {
  constructor (props){
    super (props);
    
    this.handleReset = this.handleReset.bind(this);
  }
  handleToggleComplete (idx){
    this.props.todos.toggleComplete(idx);    
  }
  handleReset (){
    this.props.todos.resetChecks();
  }
  componentDidMount (){
      this.props.todos.loadItems();
  }
  render (){
    const { 
        items, 
        completedTasks, 
        remainingTaskCount, 
        completedTaskCount 
    } = this.props.todos;
    
    let remainingThings = items.map((item, i) => {
      var boundClick = this.handleToggleComplete.bind(this, i);
      return (
        <li key={i} className="list-group-item">              
            <Checkbox 
                label={!item.done ? item.name : <strike>{item.name}</strike>}                   
                checked={item.done}                
                onClick={boundClick}
            />
        </li>
      );
    });    
    let completedThings = completedTasks.map((item, i) => {
        return (
            <li key={i} className="list-group-item">
                {item.name}&nbsp;                    
                <i className="material-icons">done</i>
            </li>
        );
    });
    
    return (
      <div>          
        <Grid>
            <Row>           
                <Header 
                    completed={completedTaskCount} 
                    remaining={remainingTaskCount} 
                    handleReset={this.handleReset}    
                />
            </Row>            
            <Row md={12}>
                <Col md={4}>                    
                    <Paper zDepth={4}>
                        <select className="form form-control">
                            <option>select a list</option>
                            <option>random</option>
                        </select>
                    </Paper>
                    <br />                                       
                </Col>
                <Col md={4} > 
                    <Paper zDepth={4}>           
                        <ul className="list-group">
                        {remainingThings}
                        </ul>
                    </Paper>
                </Col>          
                <Col md={4}>      
                    <Paper zDepth={4}>      
                        <ul className="list-group">
                        {completedThings}
                        </ul>
                    </Paper>
                </Col>
            </Row>              
            <Row>
                <Col md={4} mdOffset={4}>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col mdOffset={6} smOffset={10} xsOffset={5}>
                <FloatingActionButton 
                        style={{marginRight: 20}}
                        zDepth={4}
                        onTouchTap={() => alert('add a list!')}
                    >
                        <ContentAdd />
                    </FloatingActionButton>                                    
                    <span onClick={this.handleReset} style={styles.reset}>
                        {/*<i className="material-icons md-40">autorenew</i>*/}
                        <i className="glyphicon glyphicon-refresh text-muted"></i>
                    </span>
                </Col>
            </Row>                 
        </Grid>
      </div>
    );
  }
}

const styles = {
    reset: {
        fontSize: 48,
        cursor: 'pointer'
    }
};

export default App;