import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss';
import { getAllUsers,createNewUserService ,deleteUserService,editUserService} from '../../services/userService';
import ModalUser from './modalUser';
import {emitter} from "../../utils/emitter";
import modalEditUser from './modalEditUser';
import ModalEditUser from './modalEditUser';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser:false,
            userEdit:{}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
            
    }
    getAllUsersFromReact=async()=>{
        let response = await getAllUsers('ALL');
           
            
            if (response && response.errCode === 0) {  
                this.setState({
                    arrUsers: response.user  
                });
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }
    toggleUserModal =()=>{
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    toggleUserEditModal =()=>{
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (data) =>{
        try {
        let response = await createNewUserService(data);
        if (response && response.errCode !== 0){
            alert(response.errMessage);
        }else{
            this.getAllUsersFromReact();
            this.setState({
                isOpenModalUser: false,
                isOpenModalEditUser: false,
            })
            emitter.emit('Event_Clear_Modal_Data')
        }
        } catch (error) {
            console.log (error)
        }
       
    }
    handelDeleteUser = async (user)=>{
        console.log ('delete:',user)
        try{
           let res=  await deleteUserService (user.id);
           if (res && res.errCode === 0){
                await this.getAllUsersFromReact();
           }else{
            alert(res.errMessage);
           }
           console.log (res)
        }catch(error){
            console.log (error)
        }
    }
    handeEditUser = (user)=>{
        console.log('check edit user:',user)
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
           
        })
    }

    doEditUser = async (user) =>{
        try {
            let res = await editUserService(user);
            if(res && res.errCode===0){
                this.setState({
                    isOpenModalEditUser: false,
                })
                await this.getAllUsersFromReact();
            }else{
                alert(res.errCode);
            }
        }catch(error){
            console.log (error)
        } 
    }

    render() {
       
        let arrUsers = this.state.arrUsers || [];
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                
                />
                {
                this.state.isOpenModalEditUser && 
                <ModalEditUser
                     isOpen={this.state.isOpenModalEditUser}
                toggleFromParent={this.toggleUserEditModal}
                currentUser={this.state.userEdit}
                editUser = {this.doEditUser}
                //createNewUser={this.createNewUser}
                />}
                <div className="title text-center">User Manage</div>
                <div className='mx-1' >
                    <button className='btn btn-primary px-3 ' 
                        onClick={()=>this.handleAddNewUser()}
                    >
                        < i className="fas fa-plus"></i>Add New User</button>
                </div>
                <div className="user-table mt-3 mx-1">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">FirstName</th>
                                <th scope="col">LastName</th>
                                <th scope="col">Address</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers && arrUsers.length > 0 ? 
                                arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn-edit" onClick={()=>this.handeEditUser(item)}>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button className="btn-delete" onClick={()=>this.handelDeleteUser(item)}>
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan="5" style={{textAlign: 'center'}}>No data</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);