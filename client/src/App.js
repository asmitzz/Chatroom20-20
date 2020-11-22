import React, { Component } from 'react';
import { Route,Switch } from 'react-router-dom';
import Home from './Components/Home/home';
import Chatroom from './Components/Chatroom/chatroom';
import Login from './Authorization/Login/login';
import Signup from './Authorization/signup/signup';
import fire from './Authorization/Auth';


class App extends Component{
    
     state = {
       user:""
     };

     componentDidMount = () =>{
        fire.auth().onAuthStateChanged( user => {
           if( user ){
              this.setState({ user: user })
           }
           else{
             this.setState({ user:null })
           }
        } )
     }

     
     
  render(){

    const App = (<Switch>
      <Route path="/" exact component={Home} />
      <Route path="/chatroom" component={Chatroom} />
   </Switch>)

   const auth = (<Switch>
    <Route path="/" exact component={Login} />
 <Route path="/signup" component={Signup} />
 </Switch>)

    return(
      <div>
        {this.state.user ? (App) : (auth) }
      </div>
    );
  }
}

export default App;
