import React from 'react';
import Login from './Login'
import Contacts from './Contacts';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AppBar,Toolbar } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main:'#3797a4'
        },
        secondary: {
            main: '#888888'
          }
      },
});

export default class App extends React.Component{
    state= {
        isLoggedIn: false,
        failed: false
    }
     handleSubmit = (user,pswd)=>{
      this.callBackendAPI(user,pswd)
      .catch(err => console.log(err));
        
    }
    callBackendAPI = async (user,pswd) => {
      let userData = {
        username: user,
        password: pswd
      }
     
      const response = await fetch('/login',{
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {"Content-Type": "application/json"}
      });
      //const body = await response.json();
  
      if (response.status === 200) {
        this.setState(prev=>({
          ...prev,
          isLoggedIn: true
      }))
     } else {
        this.setState(prev=>({
          ...prev,
          failed: true
        }))
      }
    }
    render () {
    return (
        <div style={{backgroundColor: '#f1f9f9'}}>
        <MuiThemeProvider theme={theme}>
        <AppBar className='bar' position="static">
        <Toolbar>
          <h2>
            LOGO
          </h2>
        </Toolbar>
      </AppBar>
        <div>
            {!this.state.isLoggedIn && <Login handleSubmit={this.handleSubmit} failed={this.state.failed}/>}
            {this.state.isLoggedIn && <Contacts authenticated={this.state.isLoggedIn}/>}
        </div>
        </MuiThemeProvider>
        </div>
    )
        }
}