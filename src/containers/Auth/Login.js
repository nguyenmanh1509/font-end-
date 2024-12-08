import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import  {handleLoginApi}  from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state ={
            username: '',
            password: '',
            isShowPassWord:false,
            errMessage:''

        }
    }

    handleOnChangeUserName =(event)=>{
        this.setState({
            username: event.target.value
        })
        

    }
    handleOnChangePassWord =(event)=>{
        this.setState({
            password: event.target.value
        })
        
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        });
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            console.log('API Response:', data);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                });
            }
            if (data && data.errCode === "OK") {
                this.props.userLoginSuccess(data.user)
                console.log('login succeeds');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    });
                }
            }
            console.log('loi', error.response); // Log chi tiết lỗi phải nằm trong catch
        }
    };
    
    handleShowHidePassWord= () => {
        this.setState({
            isShowPassWord: !this.state.isShowPassWord
        })
    }
    render() {
        return (
            
          <div className= "login-backgroud"> 
            <div className="left-content">
                <div className="logo-container">
                    
                </div>
               
            </div>
            <div className ="login-container">
                
            <div className="login-content row">
                <div className="col-12 text-login" >Login</div>
                <div className="col-12 form-group login-input">
                    <label>UserName:</label>
                    <input type='text" className ="form-control'placeholder="Enter your username" value={this.state.username} 
                    onChange={(event) => this.handleOnChangeUserName(event)}
                    ></input>
                </div>
                <div className='col-12 form-group login-input'>
                    <label>PassWord:</label>
                    <div className='custom-input-password'>
                    <input type={this.state.isShowPassWord ? 'text': 'password'}
                        className='form-control'
                        value={this.state.password}
                        placeholder="Enter your password"
                        onChange={(event) => this.handleOnChangePassWord(event)}
                    ></input>
                    <span onClick={()=>{this.handleShowHidePassWord()}}>
                        
                        <i className={this.state.isShowPassWord?"far fa-eye":'fas fa-eye-slash'}></i></span>
                    
                    </div>
                    
                </div>
                <div className ='col-12' style={{color:'red'}}>
                    {this.state.errMessage}

                </div>
                <div className='col-12 '>
                <button className=' btn-login' onClick ={()=> {this.handleLogin()}} >Login</button>

                </div>
                <div className='col-12'>
                    <span className="forgot-password" >Forgot your password</span>
                </div>
                <div className="col-12 text-center">
                    <span className='text-other-login'>Or Login with</span>
                </div>
                <div className='col-12 social-login'>
                <i className="fab fa-google"></i>
                <i className="fab fa-facebook"></i>
                
                </div>
            </div>
            </div>
          
           </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess:(userInfo)=> dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login); 