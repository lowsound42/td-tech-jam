import React, { Component } from "react";
import axios from 'axios';
import { Redirect} from "react-router-dom";
import './mainlogin.scss';
import * as Constants from "../utils/constants";


class MainLogin extends React.Component {
	state = {
		account: '',
		login: null,
	}

	resetState = () => {
		this.setState({login:null});
	}

	formSubmit = (event) => {
		event.preventDefault();
		console.log(event.target.userCode.value)
		if (event.target.userCode.value){
			this.setState({
				login: '/beacon',
				code: event.target.userCode.value,
			})
			} else alert('please enter valid credentials');
	}

	render() {
		setTimeout(console.log(this.state.data), 3000)
		if (this.state.login !== null) 
		{
		console.log(this.state.login);
			return <Redirect push to={{
			pathname: this.state.login,
			state: {code: this.state.code}}}/>
		} 
		return (
			<>
				<div className='mainlogin__container'>
					<img className='mainlogin__container-image' src={Constants.Images.td}/>
					<form onSubmit={this.formSubmit} className='mainlogin__container-form-flex'> 
						<input className='mainlogin__container-form-flex--code' type='text' placeholder='Account Number' name='userCode'></input>
						<input className='mainlogin__container-form-flex--pass' type='password' placeholder='Enter your password'></input>
						<button className='mainlogin__container-form-flex--button' type='submit'>Login</button>
					</form>
				</div>
			</>
		);
	}
}


export default MainLogin;
