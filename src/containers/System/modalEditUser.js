import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from '../../utils/emitter';
import _ from 'lodash';


class ModalEditUser extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            email:'',
            firstName:'',
            lastName: '',
            address:'',
            phonenumber:'',
            roleId:'',
        }   
       
    }
    
    
    componentDidMount() {
        let user = this.props.currentUser;
        if(user &&!_.isEmpty(user)){
            this.setState({
                id: user.id,
                email:user.email,
                firstName:user.firstName,
                lastName:user.lastName,
                address:user.address,
                phonenumber:user.phonenumber,
                roleId:user.roleId,
            })
        }
        console.log('mouting edit',this.props.currentUser)
    }
    
    toggle=()=>{
        this.props.toggleFromParent();

    }       
    handleOnChageInput=(event,id)=>{
        
        
        let copyState ={...this.state};
        copyState[id]=event.target.value;
        this.setState({
            ...copyState
        });
        
    }
    
    checkValideInput = () =>{
        let isValid =true;
        let arrInput = ['email','firstName','lastName','address','phonenumber','roleId'];
        for(let i=0;i<arrInput.length;i++){
            if(!this.state[arrInput[i]]){   
                isValid = false;
                alert('Missing parameter:'+arrInput[i]);
                break;
        }
        
    };
        return isValid;
}
        handleSaveUser=()=>{
        let isValid= this.checkValideInput();
        if(isValid===true){
            // call api edit user
            this.props.editUser(this.state);
            
        
    }
    
}

    render() {
        console.log('check edit ',this.props)
            return (
            <Modal 
                isOpen={this.props.isOpen}
                toggle={()=>this.toggle()}
                className={'modal-user-container'}
                size="lg"
                >
              <ModalHeader toggle={()=>this.toggle()}>EDIT USER</ModalHeader>
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
                            <label>role</label>
                            <input type='text'onChange={(event)=>{this.handleOnChageInput(event,"roleId")}}
                            value={this.state.roleId}
                            ></input>
                        </div>
                </div>
                        

              </ModalBody>
              <ModalFooter>
                <Button 
                color="primary" 
                className='px-3' 
                onClick={()=>this.handleSaveUser()}>
                  Save changes
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);





