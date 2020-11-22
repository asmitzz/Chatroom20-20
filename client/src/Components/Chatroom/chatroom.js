import React,{ Component } from 'react';
import Aux from '../../Hoc/auxi';
import io from 'socket.io-client';
import { Modal } from 'react-bootstrap';


let socket;
const Endpoint = "http://localhost:5000/";
let Name;
let Msg;


class chatroom extends Component{     
      state = {
          show: true,
          name:"",
          msg:""
      };

      componentDidMount = () => {
         const category = new URLSearchParams(window.location.search).get('category');
         const MSG = document.getElementById('msg');
         const NAME = document.getElementById('name');
         const POPULATION = document.getElementById('population');
         const MSG_BOX = document.getElementById('msgBox');

        MSG.addEventListener('keypress',(event)=>{
            if( event.keyCode === 13 ){
                 this.SendBtnHandler();
            }
        })

        NAME.addEventListener('keypress',(e) => {
            if( e.keyCode === 13 ){
                this.closeModal();
            }
        })


         socket = io(Endpoint);
         console.log(socket);
         
         this.setState({ show:true })
        
         socket.emit('joinRoom',category);
         socket.on('population',count => {
                POPULATION.innerHTML = count;
         })
 
        
         socket.on('receiveMsg',(name,msg) =>{
            let p = document.createElement('span');
            p.classList.add("text-light","bg-secondary","border","my-2","rounded","d-flex","w-100","px-2","py-2")
            p.innerHTML = "<strong>"+name+":&nbsp;</strong>"+msg;
            MSG_BOX.appendChild(p);
        })

        socket.on('UserLeft',(userleft) =>{
            let p = document.createElement('span');
            p.classList.add("text-secondary","my-2","d-flex","overflow","justify-content-center","px-2","py-2")
            p.innerHTML = userleft+"&nbsp;has left the chat";
            MSG_BOX.appendChild(p);
        })
       
      }

          closeModal = () => {
          const category = new URLSearchParams(window.location.search).get('category');
          this.setState({ show: false });
          const MSG_BOX = document.getElementById('msgBox');
          document.getElementById('category').innerHTML = category;
          
          if( this.state.name === "" ){
              Name = "Annoymous";
                 socket.emit('Username',Name,category);
                 socket.on('receiveUsername',username => {
                 let p = document.createElement('span');
                 p.classList.add("text-secondary","my-2","d-flex","overflow","justify-content-center","px-2","py-2")
                 p.innerHTML = username+"&nbsp;has joined the chat";
                 MSG_BOX.appendChild(p);
            })
          }
          else{
            Name = this.state.name;
            socket.emit('Username',Name,category);
            socket.on('receiveUsername',username => {
               let p = document.createElement('span');
               p.classList.add("text-secondary","my-2","d-flex","overflow","justify-content-center","px-2","py-2")
               p.innerHTML = username+"&nbsp;has joined the chat";
               MSG_BOX.appendChild(p);
          })
        }
         
      
    }

   
    NameChangeHandler = (e) =>{
          this.setState({ name: e.target.value })
    }

    MsgHandler = (e) =>{
        this.setState({ msg: e.target.value })
    }

    SendBtnHandler = () =>{
        const category = new URLSearchParams(window.location.search).get('category');
        if( this.state.msg === "" ){
            return;
        }
        Msg = this.state.msg;
        let p = document.createElement('span');
            const MSG_BOX = document.getElementById('msgBox');
            p.classList.add("text-light","bg-success","border","rounded","my-2","d-flex","col","justify-content-start","w-100","px-2","py-2")
            p.innerHTML = "<strong>You:&nbsp;</strong>"+Msg;
            MSG_BOX.appendChild(p);

            socket.emit('sendMessage',Name,Msg,category);
            this.setState({ msg:"" });        
    }
   

      render(){ 
          
       const style = {
           height:"75%",
           overflow:"scroll",
           overflowX:"hidden",
           position:"absolute",
           left:15,
           width:"100%"
       }

       const msgBox={
           position:"absolute",
           height:"10%",
           bottom:0,
           left:20,
           width:"100%"
       }

       const header = {
           height:"10%"
       }

       const overflow = {
           overflow:"hidden"
       }
          return(

                  <Aux>
                      <div style={overflow}>
                          
                          <Modal show={this.state.show}>
                                  <Modal.Header>
                                     <h5 className="modal-title">Enter your name for chatroom(leave blank for anonymous)</h5>
                                  </Modal.Header>
                                  <Modal.Body>
                                      <input className="form-control" onChange={this.NameChangeHandler}  id="name" placeholder="Enter name" />
                                  </Modal.Body>
                                  <Modal.Footer>
                                      <button className="btn btn-primary btn-block" onClick={this.closeModal}>Enter</button>
                                  </Modal.Footer>
                          </Modal>
          
                          <div className="row w-100 bg-success font-italic text-light m-0" style={header}>
                              <div className="h6 col-9 d-flex justify-content-center py-3">
                                  RoomName =&nbsp; <span id="category"></span>
                              </div>
                              <div className="col-3 d-flex align-self-center">
                                  <span id="population"></span>&nbsp;people online
                              </div>
                         </div>
          
                         <div className="row border border-dark rounded " style={style}>
                              <div id="msgBox" className="col">
                           
                             </div>
                         </div>
                     </div>

                     <div className="row" style={msgBox}>
                          <div className="col-10 p-0 mt-2">
                             <input id="msg" type="text" placeholder="Type your message here" value={this.state.msg} onChange={this.MsgHandler} className="form-control " />         
                          </div>
                          <div className="col-2 p-0 mt-2">
                             <button className="btn w-75 px-0 btn-dark" id="send" onClick={this.SendBtnHandler} >Send</button>  
                          </div>
                      </div>
                  </Aux>
              );
          };
 };

 

export default chatroom;