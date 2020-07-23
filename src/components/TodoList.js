import React, { Component } from "react";
import TodoItem from './TodoItem';
import Axios from 'axios';
import { DragDropContext, Droppable} from "react-beautiful-dnd";
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';

import { Item, base_url } from '../App'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "purple",
  padding: grid,
  width: 250
});

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [new Item("Click here to edit text!", 1)],
      lastID: 1
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.editItemDesc = this.editItemDesc.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  deleteItem(item_index) {
    var items = this.state.items
    items.splice(item_index, 1)
    this.setState({
      items: items
    })
  }

  editItemDesc(item_index, new_desc) {
    var items = this.state.items
    items[item_index].description = new_desc
    this.setState({
      items: items
    })

  }

  addItem(){
    var items = this.state.items
    const item = new Item("Add your text here!", this.state.lastID+1)
    items.push(item)
    this.setState({
      items: items,
      lastID: this.state.lastID + 1
    })
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const reordered_items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items: reordered_items
    });
  }

  componentWillReceiveProps(nextProps){
    let todolist = nextProps.todolist
    todolist.sort(function(x,y){
      if(x.id > y.id){
        return 1
      }else{
        return -1
      }
    })
    if(nextProps.todolist !== this.props.todolist){
      this.setState({items: nextProps.todolist, lastID: todolist[todolist.length-1].id})
    }
  }

  saveListChhanges = () => {
    var payload = {
      todolist: this.state.items
    }
    Axios.post(base_url + 'user/edit-list', payload,  { 
      headers: {
        'Authorization': 'Token ' + Cookies.get('token')
      }
    })
    
  }

  render() {
    console.log(this.props.todolist)
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                  {this.state.items.map((item, index) => (
                    <TodoItem item={item} index={index} key={item.id} handleDelete={this.deleteItem} handleEdit={this.editItemDesc} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <br/>
          <div style={{clear:'both'}}>
            <Button variant="contained" color="primary" onClick={this.addItem}>+</Button>
          </div>
          <div style={{clear:'both'}}>
            <Button variant="contained" color="primary" onClick={this.saveListChhanges}>Save changes</Button>
          </div>
        </div>
    );

  }

}
 
export default TodoList;