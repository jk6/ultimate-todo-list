import { observable, computed, action } from 'mobx';
import axios from 'axios';

class TodoList {
  @observable items = [];   

  @action loadItems (){
    axios.get('./data/items.json')
        .then(response => Object.assign(this.items, response.data))
        .catch(err => console.log(err.toString()))
  }  

  @computed get completedTasks (){
    return this.items.filter(thing => thing.done == true);
  }    
  
  @computed get remainingTaskCount (){
    return this.items.filter(thing => thing.done == false).length;   
  }
  @computed get completedTaskCount (){
    return this.items.filter(thing => thing.done == true).length;   
  }
  @action toggleComplete (idx){
    this.items[idx].done = !this.items[idx].done;    
  }
  @action resetChecks (){
    this.items.map(thing => thing.done = false);
  }
}

export default new TodoList();