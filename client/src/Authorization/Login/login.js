import React,{ Component } from 'react';
import Aux from '../../Hoc/auxi';
import fire from '../Auth';

class login extends Component{

    state = {
         email:"",
         password:""
    };
     
    componentDidMount() {
        const LOGIN_BTN = document.getElementById('login');
        LOGIN_BTN.addEventListener('keypress',( e ) => {
            if( e.keyCode === 13 ){
                 this.loginHandler();
            }
        })
    }

    loginHandler = () => {
            fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).catch(err => {
                document.getElementById('wrongPassword').innerHTML= err.message ;
            })
    }

    emailHandler = (e) => {
        this.setState({ email: e.target.value })
    }

    passwordHandler = (e) => {
        this.setState({ password: e.target.value })
       
    }

    render(){

        const style = {
           width:"300px"
        }

        const heading = {
            fontFamily: 'Pacifico'
        }

        

        return(

            <Aux>
                <div className="container d-flex flex-column py-5 border rounded mt-5" style={style}>
                   <div className="align-self-center pb-2">
                       <h1 className="h1" style={heading}>Chatroom</h1>
                   </div>

                   <form className="d-flex flex-column">
                       <div className="form-group pt-5">
                           <input className="form-control" style={{ background:"#F8F8FF" }} onChange={this.emailHandler} value={this.state.email} type="email" placeholder="Enter email address" />
                       </div>
                       <div className="form-group">
                           <input id="login" className="form-control" style={{ background:"#F8F8FF" }} onChange={this.passwordHandler} value={this.state.password} type="password" placeholder="Password" />
                           <p className="text-danger" id="wrongPassword"></p>
                       </div>
                   </form>
                   <div className="form-group">
                           <button className="btn btn-primary btn-block" onClick={this.loginHandler}><strong>Log in</strong></button>
                   </div>
                  
                </div>   
                <div className="container d-flex flex-column pt-2 border rounded my-1" style={style}>
                       <p className="text-center">Don't have an account?&nbsp;<strong className="text-primary"><a className="text-decoration-none" href="/signup">Sign up</a></strong></p>
                </div>
            </Aux>
            
        );
    };
};

export default login;