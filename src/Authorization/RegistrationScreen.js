import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import NavBar from '../components/NavBar';
import { base_url } from '../App'

const style = {
    margin: 15,
};

class RegistrationScreen extends Component{
    constructor(){
        super()
        this.state={
            email: '',
            password1: '',
            password2: '',
            first_name: '',
            last_name: '',
            redirectToLogin: false
        }
    }

    async register(){
        if (this.state.password1 !== this.state.password2){
            alert("Passwords must match!")
        }else{
            const payload = {
                username: this.state.email,
                password: this.state.password1
            }
            await Axios.post(base_url + 'authorization/registration', payload).then(
                () => {
                    this.setState({redirectToLogin: true})
                }
            )
        }
    }

    render(){
        if(this.state.redirectToLogin){
            return <Redirect to='login'/>
        }
        return(
            <div style={{textAlign:"center"}}>
                <MuiThemeProvider>
                    <div>
                        <NavBar title='Registration'/>
                        <TextField 
                            id="standard-basic" 
                            label="Email"
                            onChange = {(event) => this.setState({email:event.target.value})}
                        />
                        <br/>
                        <TextField
                            type = "password"
                            hintText="Password"
                            label= "Enter Password"
                            floatingLabelText="Enter your password"
                            onChange = {(event) => this.setState({password1: event.target.value})}
                        />
                        <br/>
                        <TextField
                            type = "password"
                            hintText="Password"
                            label="Retype Password"
                            onChange = {(event) => this.setState({password2:event.target.value})}
                        />
                        <br/>
                        <RaisedButton label="Create account" primary={true} style={style} onClick={(event) => this.register(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }


}

export default RegistrationScreen; 