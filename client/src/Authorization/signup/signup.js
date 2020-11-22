import React,{ Component } from 'react';
import Aux from '../../Hoc/auxi';
import fire from '../Auth';

class signup extends Component{

    state = {
        email:"",
        password:""
   };

   SignUpHandler = () => {
           fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).catch(err => {
            document.getElementById('signuperror').innerHTML= err.message ;
        });
   }

   emailHandler = (e) => {
       this.setState({ email: e.target.value })
   }

   passwordHandler = (e) => {
       this.setState({ password: e.target.value })
   }


    render(){
 
        const style = {
            width:"300px",
        }

        const a = {
            textDecoration: "none",
            color: "black"
        }

        const heading = {
            fontFamily: 'Pacifico'
        }

        return(

            <Aux>
               <div className="container d-flex flex-column pt-5 border rounded mt-3" style={style}>
                   <div className="align-self-center pb-2">
                       <h1 className="h1" style={heading}>Chatroom</h1>
                   </div>

                   <form className="d-flex flex-column">
                       <div className="form-group pt-5">
                           <input className="form-control" onChange={this.emailHandler} value={this.state.email} style={{ background:"#F8F8FF" }} type="email" placeholder="Email" />
                       </div>
                       <div className="form-group">
                           <input className="form-control" style={{ background:"#F8F8FF" }} type="text" placeholder="Fullname" />
                       </div>
                       <div className="form-group">
                           <input className="form-control" style={{ background:"#F8F8FF" }} type="username" placeholder="Username" />
                       </div>
                       <div className="form-group">
                           <input className="form-control" onChange={this.passwordHandler} value={this.state.password} style={{ background:"#F8F8FF" }} type="password" placeholder="Password" />
                       </div>
                   </form>
                   <p id="signuperror" className="text-danger"></p>
                   <div className="form-group">
                           <button onClick={this.SignUpHandler} className="btn btn-primary btn-block" ><strong>Sign up</strong></button>
                   </div>
                   <p className="text-center text-muted">By signing up, you agree to our <a style={a} href="/terms">Terms</a> , <a style={a} href="/datapolicy">Data Policy</a> and <a style={a} href="/cookies">Cookies Policy</a> .</p>
                   
                </div>
                   <div className="container d-flex flex-column pt-2 border rounded my-1" style={style}>
                       <p className="text-center">Have an account?&nbsp;<strong className="text-primary"><a style={a} className="text-primary"  href="/">Log in</a></strong></p>
                   </div>
            </Aux>
        );
        };
        
    }

export default signup;