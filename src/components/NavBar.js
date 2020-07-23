import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';

class Navbar extends Component{
    render(){
        return(
            <AppBar title={this.props.title}/>
        )
    }

}

export default Navbar;