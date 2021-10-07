import React from 'react';
import { SignInAndSignUpContainer } from './sign-in-and-sign-up.styles';
import SignIn from '../../sign-in/sign-in';
import SignUp from '../../sign-up/sign-up';

const SignInSignUpPage =() =>(
    <SignInAndSignUpContainer>
    <SignIn />
    <SignUp />
  </SignInAndSignUpContainer>
);
export default SignInSignUpPage;