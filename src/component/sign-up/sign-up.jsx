import React from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import {signUpStart} from '../../redux/user/userAction';

import './sign-up.scss';


class SignUp extends React.Component{
    constructor(){
        super();
        
        this.state={
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
        }
    }
    handleSubmit = async event =>{
        event.preventDefault();
        const {displayName, email,password,confirmPassword}=this.state;
        const {signUpStart}= this.props
        if(password !== confirmPassword){
            alert("passwords don't match");
            return;
        }
        signUpStart(email,password,displayName);
        
    }
    handleChange = event =>{
        const {name,value} = event.target;
        this.setState({[name]:value })
    }
    render(){
        const {displayName, email,password,confirmPassword}=this.state;
        return(
            <div className="sign-up">
                <h2 className="title">I do not have account.</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput 
                        type="text"
                        name="displayName"
                        label="Display Name"
                        value={displayName}
                        handleChange={this.handleChange}
                        required
                    />
                <FormInput 
                        name="email" 
                        type="email" 
                        label="Email"
                        value={email} 
                        handleChange={this.handleChange}
                        required />
                 <FormInput 
                        name="password" 
                        type="password" 
                        label="Password"
                        value={password} 
                        handleChange={this.handleChange}
                        required />
                 <FormInput 
                        name="confirmPassword" 
                        type="password" 
                        label="Confirm Password"
                        value={confirmPassword} 
                        handleChange={this.handleChange}
                        required />
                <CustomButton type="submit">SIGN UP</CustomButton>
                </form>
            </div>
        );
    }
}
const mapDispatchToProps =dispatch =>({
    signUpStart:(email,password,displayName)=>dispatch(signUpStart({email,password,displayName}))
})
export default connect(null,mapDispatchToProps)(SignUp);