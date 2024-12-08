import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from '../../utils/emitter'
class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state ={
            email:'',
            password: '',
            firstName:'',
            lastName: '',
            address:'',
            phonenumber:'',
            gender:'',
            role:'',
        }   
        this.listenToEmitter();
    }
    listenToEmitter = () =>{
        emitter.on('Event_Clear_Modal_Data',() =>{
            this.setState({
                email:'',
                password: '',
                firstName:'',
                lastName: '',
                address:'',
                phonenumber:'',
                gender:'',
                role:'',
                
            })
            
        })
    }
    componentDidMount() {
        console.log('mouting modal')
    }
    
    toggle=()=>{
        this.props.toggleFromParent();

    }       
    handleOnChageInput=(event,id)=>{
        
        // good code
        let copyState ={...this.state};
        copyState[id]=event.target.value;
        this.setState({
            ...copyState
        });
        
    }
    
    checkValideInput = () =>{
        let isValid =true;
        let arrInput = ['email','password','firstName','lastName','address','phonenumber','gender','role'];
        for(let i=0;i<arrInput.length;i++){
            if(!this.state[arrInput[i]]){   
                isValid = false;
                alert('Missing parameter:'+arrInput[i]);
                break;
        }
        
    };
        return isValid;
}
    handleAddNewUser=()=>{
        let isValid= this.checkValideInput();
        if(isValid===true){
            this.props.createNewUser(this.state);
            
        
    }
    
}

    render() {
            return (
            <Modal 
                isOpen={this.props.isOpen}
                toggle={()=>this.toggle()}
                className={'modal-user-container'}
                size="lg"
                >
              <ModalHeader toggle={()=>this.toggle()}>CREATE A NEW USER</ModalHeader>
              <ModalBody>   
                <div className="modal-user-body">
                <div className='input-container'>
                            <label>Email</label>
                            <input type='text' 
                            onChange={(event)=>{this.handleOnChageInput(event,"email")}}
                            value={this.state.email}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password'
                            onChange={(event)=>{this.handleOnChageInput(event,"password")}}
                            value={this.state.password}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>FirstName</label>
                            <input type='text'onChange={(event)=>{this.handleOnChageInput(event,"firstName")}}
                            value={this.state.firstName}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>LastName</label>
                            <input type='text'onChange={(event)=>{this.handleOnChageInput(event,"lastName")}}
                            value={this.state.lastName}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Address</label>
                            <input type='text'onChange={(event)=>{this.handleOnChageInput(event,"address")}}
                            value={this.state.address}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>phonenumber</label>
                            <input type='text'onChange={(event)=>{this.handleOnChageInput(event,"phonenumber")}}
                            value={this.state.phonenumber}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Gender</label>
                            <input type='text'onChange={(event)=>{this.handleOnChageInput(event,"gender")}}
                            value={this.state.gender}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>role</label>
                            <input type='text'onChange={(event)=>{this.handleOnChageInput(event,"role")}}
                            value={this.state.role}
                            ></input>
                        </div>
                </div>
                        

              </ModalBody>
              <ModalFooter>
                <Button 
                color="primary" 
                className='px-3' 
                onClick={()=>this.handleAddNewUser()}>
                  Save
                </Button>
                <Button color="secondary" className='px-3'onClick={()=>this.toggle()}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          );    
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);





