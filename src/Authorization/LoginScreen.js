import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

import { base_url } from '../App';
import NavBar from '../components/NavBar';



const style = {
    margin: 15,
};

class LoginScreen extends Component{
    state={
        email: '',
        password: '',
        redirectToDash: false,
        redirectToRegister: false
    }

    async login(){
        if (this.state.password1 !== this.state.password2){
            alert("Passwords must match!")
        }else{
            const payload = {
                username: this.state.email,
                password: this.state.password
            }
            await Axios.post(base_url + 'authorization/login', payload).then(
                (res) => {
                    Cookies.set('token', res.data.token)
                    this.setState({redirectToDash: true})
                    
                }
                
            )
        }
    }

    registerRedirect = () =>  {
        this.setState({redirectToRegister: true})
    }


    render(){
        if(this.state.redirectToRegister){
            return <Redirect to='registration'/>
        }

        if(this.state.redirectToDash){
            return <Redirect to='dashboard'/>
        }

        return(
            <div style={{textAlign:"center"}}>
                <MuiThemeProvider>
                    <div>
                        <NavBar title='Login'/>
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
                            onChange = {(event) => this.setState({password: event.target.value})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.login(event)}/>
                        <p>No account? Click below to register.</p>
                        <RaisedButton label="Register" primary={true} style={style} onClick={this.registerRedirect}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }


}

export default LoginScreen;