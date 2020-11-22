import React ,{ Component } from 'react';
import Books from '../../img/books.jpeg';
import Games from '../../img/games.jpeg';
import Music from '../../img/music.jpeg';
import Movies from '../../img/movie.jpg';
import Plus from '../../img/Plus.png'
import fire from '../../Authorization/Auth';
import { Modal } from 'react-bootstrap'; 



class home extends Component{
            
   
   state = {
      show:false,
      name:"",
      join:false,
      joinname:""
   }

  

   HostRoom = () => {
     
         if( this.state.name === "" ){
            return;
         }
         else{
           this.props.history.push("/chatroom?category="+this.state.name);
         }
   }
  
   closeModal = () => {
      this.setState({ show:false , join:false })
   }

   RoomNameHandler =(e) => {
      this.setState({ name:e.target.value });
      window.addEventListener('keypress',(e) => {
         if( e.keyCode === 13 ){
            this.HostRoom();
         }
      })
   }

 

   HostModalOpenHandler = () => {
      this.setState({ show:true});
   }


   logoutHandler = () => {
        fire.auth().signOut();
   }
    
   
   render(){
      const style = {
         background: "green",
      };

      const a = {
         textDecoration: "none",
     }


      return(
         <div className="container-fluid pt-5 " style={style}>
                         <Modal className="mt-5" show={this.state.show}>
                                  <Modal.Header>
                                     <h5 className="modal-title">Create custom room/ Join room</h5>
                                     <button className="btn btn-danger" onClick={this.closeModal}><strong>X</strong></button>
                                  </Modal.Header>
                                  <Modal.Body>
                                      <input className="form-control" id="name" onChange={this.RoomNameHandler} value={this.state.name} placeholder="Enter room name" />
                                  </Modal.Body>
                                  <Modal.Footer>
                                      <button onClick={this.HostRoom} className="btn btn-primary btn-block">Host or Join</button>
                                  </Modal.Footer>
                          </Modal>
             <div className="text-light ">
                <h1 className="text-center" >Chatrooms</h1>
             </div>
               <div className="row mt-5">
                    <div className="col-sm-2 col-md-2 my-3">
                       <div className="card">
                          <img className="card-img-top" src={Books} alt="books"/>
                          <div className="card-body p-1">
                            <a style={a} href="/chatroom?category=books">
                              <h3 className="card-title text-center">Books</h3><h6 className="text-center text-secondary">(click here to join)</h6>
                            </a>
                          </div>
                       </div>
                    </div>
 
                    <div className="col-sm-2 col-md-2 my-3">
                       <div className="card">
                       <img className="card-img-top" src={Games} alt="games"/>
                          <div className="card-body p-1">
                           <a style={a} href="/chatroom?category=games">
                             <h3 className="card-title text-center">Games</h3><h6 className=" text-center text-secondary">(click here to join)</h6>
                           </a>
                          </div>
                       </div>
                    </div>
 
                    <div className="col-sm-2 col-md-2 my-3">
                       <div className="card">
                       <img className="card-img-top" src={Music} alt="music"/>
                          <div className="card-body p-1">
                           <a style={a} href="/chatroom?category=music">
                             <h3 className="card-title text-center">Music</h3><h6 className="text-center text-secondary">(click here to join)</h6>
                           </a>
                          </div>
                       </div>
                    </div>
 
                    <div className="col-sm-2 col-md-2 my-3">
                       <div className="card">
                       <img className="card-img-top" src={Movies} alt="movies"/>
                          <div className="card-body p-1">
                              <a style={a} href="/chatroom?category=movies">
                             <h3 className="card-title text-center">Movies</h3><h6 className="text-center text-secondary">(click here to join)</h6>
                           </a>
                           </div>
                       </div>
                    </div>

                    <div className="text-center col-sm-2 col-md-1 my-3">
                       <div className="">
                       <button className="btn btn-primary" onClick={this.HostModalOpenHandler} style={a}>
                          <img className="" src={Plus} alt="plus"/>
                           <p className="pl-md-1 text-light">Host/Join Room</p>
                       </button>
                       </div>
                    </div>

                    
               </div>
                 <div>
                    <br/>
                    <button className="btn btn-block btn-success" onClick={this.logoutHandler}>Logout</button>
                 ...
                 </div>

          </div>
     );
 };
 
}    
export default home;