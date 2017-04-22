import { observable, computed, action } from 'mobx';
import axios from 'axios';

class TodoList {
  @observable items = [];   
  @observable listLoaded = false;
  @observable displayComplete = false;
  @observable showAddItemModal = false;
  @observable lists = ['monday', 'random', 'tech'];   // temp
  @observable currentList = '';

  @action loadItems (list){
    if (list != ''){
      axios.get(`./data/${list}.json`)                
            .then(response => this.items = response.data)
            .then(() => this.currentList = list)
            .catch(err => console.log(err.toString()))
    }
    else {
      this.currentList = '';
      this.items = [];      
    }    
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
  @action resetComplete (){
    this.displayComplete = false;
  }
  @action showNewItemModal (){
    this.showAddItemModal = true;
  }
  @action addListItem (newItem){    
    let matches = this.items.filter(item => item.name == newItem.name).length;

    if (matches == 0){
      this.items = [...this.items, newItem];  
    }
    else {
      alert(`'${newItem.name}' already exists`);
    }

    this.showAddItemModal = false;   
  }
  @action cancelAdd (){
    this.showAddItemModal = false;
  }
}

export default new TodoList();