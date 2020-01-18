import React, { Component } from 'react';
import { action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Grid, Row, Col, Modal } from 'react-bootstrap';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Snackbar from 'material-ui/Snackbar';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import Header from './Header';
//import IconButton from 'material-ui/IconButton';
import 'bootstrap/dist/css/bootstrap.css';
import 'material-design-icons/iconfont/material-icons.css';

@inject('todos') @observer
export default class App extends Component {
  constructor (props){
    super (props);
    
  }
  handleShowAddItemModal = () => {
      this.props.todos.showNewItemModal();
  };

  @action handleAddListItem = () => {
    const { items } = this.props.todos;

    let newObj = {
        id: items.length.toString(),
        name: this.newItem.value,
        done: false
    };

    this.props.todos.addListItem(newObj);    
  };

  handleCancelAdd = () => {
      this.props.todos.cancelAdd();
  };

  handleToggleComplete = idx => {
    this.props.todos.toggleComplete(idx);    
  };

  handleReset = () => {
    this.props.todos.resetChecks();
  };

  handleSelectList = e => {
    this.props.todos.loadItems(e.target.value);        
  };

  componentDidMount (){
      //this.props.todos.loadItems();
  }
  render (){
    const { 
        items, 
        completedTasks, 
        remainingTaskCount, 
        completedTaskCount,
        displayComplete,
        showAddItemModal,
        lists,
        currentList
    } = this.props.todos;

    let options = lists.map((list, i) => {
        return <option key={i} value={list}>{list}</option>;
    });
    
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
                    list={currentList}
                    completed={completedTaskCount} 
                    remaining={remainingTaskCount} 
                    handleReset={this.handleReset}    
                />
            </Row>            
            <Row md={12}>
                <Col md={4}>                    
                    <Paper zDepth={4}>
                        <select 
                            className="form form-control" 
                            onChange={this.handleSelectList.bind(this)}
                        >
                            <option value="">select a list</option>
                            {options}                            
                        </select>
                    </Paper>
                    <br />                                       
                </Col>
                <Col md={4} > 
                    <Paper zDepth={4}>                               
                        {items.length > 0 &&<ul className="list-group">
                        {remainingThings}
                        </ul>}
                        {!items.length > 0 &&
                            <div className="well well-lg">
                                <Row>
                                    <Col>
                                        <span style={{fontSize: 20}}>
                                            <i className="glyphicon glyphicon-arrow-left text-muted"></i>
                                        </span>
                                    </Col>
                                </Row>
                                <Row>
                                    &nbsp;
                                </Row>
                                <Row>
                                    &nbsp;
                                </Row>
                                <Row>
                                    &nbsp;
                                </Row>
                            </div>
                        }
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
                        disabled={items.length == 0}
                        zDepth={4}
                        onTouchTap={this.handleShowAddItemModal}
                    >
                        <ContentAdd />
                    </FloatingActionButton>                                    
                    {/*<span 
                        onClick={this.handleReset} 
                        style={styles.reset} 
                        disabled={items.length == 0}
                    >*/}
                        {/*<i className="material-icons md-40">autorenew</i>*/}
                        {/*<i className="glyphicon glyphicon-refresh text-muted"></i>
                    </span>*/}
                    <FloatingActionButton 
                        style={{marginRight: 20}}
                        backgroundColor="grey"
                        //secondary={true}
                        disabled={items.length === 0}
                        zDepth={4}
                        onTouchTap={this.handleReset}
                    >
                        <i className="glyphicon glyphicon-refresh text-muted"></i>
                    </FloatingActionButton>
                </Col>
            </Row>                 
        </Grid>
        {/*<Snackbar
          open={displayComplete}
          message="All items complete!"
          autoHideDuration={4000}
          //onRequestClose={this.handleRequestClose}
        />*/}
        <Modal show={showAddItemModal} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>{`Add a new item to list '${currentList}'`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input 
                type="text" 
                className="form form-control" 
                ref={text => this.newItem = text}
                placeholder="enter new item..." 
            />
          </Modal.Body>  
          <Modal.Footer>
            <RaisedButton 
                label="OK"
                primary={true}
                onClick={this.handleAddListItem}
            />
            &nbsp;
            <FlatButton 
                label="cancel"
                onClick={this.handleCancelAdd}
            />

          </Modal.Footer>          
        </Modal>
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
