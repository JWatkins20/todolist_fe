import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';

import { base_url } from './App';
import { Item } from './App';
import TodoList from './components/TodoList';

class DashboardScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            todolist: []
        }
    }
    
    componentWillMount(){
      Axios.get(base_url + 'user/get-list', {
        headers:{
          'Authorization': 'Token ' + Cookies.get('token')
        }
      }).then(
        (res) => {
          let list = res.data.todolist
          let todolist = []
          for(let i = 0; i < list.length; i++){
            let todoitem = new Item(list[i].description, list[i].id)
            todolist.push(todoitem)
          }
          this.setState({todolist: todolist})
        }
      )

    }

    render(){
      return(
          <div>
            <TodoList todolist={this.state.todolist}/>
          </div>
      );
    }
}

export default DashboardScreen;
