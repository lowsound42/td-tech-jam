import React, { Component } from "react";
import axios from 'axios';
import { Redirect} from "react-router-dom";
import './kiosklogin.scss';
import * as Constants from "../utils/constants";


class KioskLogin extends React.Component {
	state = {
		code: '',
		login: null,
		data: []
	}

	resetState = () => {
		this.setState({login:null});
	}

	componentDidMount(){
		axios.get(`http://localhost:2112/data`)
		.then(res => this.setState({data: res.data}))
	}

	formSubmit = (event) => {
		event.preventDefault();
		console.log(this.state.data[0].code)
		console.log(event.target.userCode.value)
		var temp = this.state.data.filter(item => (item.code == event.target.userCode.value))
		console.log(temp)
		if (temp.length >= 1){
			this.setState({
				login: '/kiosk',
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
				<div className='login__container'>
					<img className='login__container-logo' src={Constants.Images.beacon}/>
					<form onSubmit={this.formSubmit} className='form__flex'> 
						<input className='form__flex-code' type='text' placeholder='Enter your code' name='userCode'></input>
						<input className='form__flex-pass' type='password' placeholder='Enter your password'></input>
						<button type='submit'>Login</button>
					</form>
				</div>
			</>
		);
	}
}


export default KioskLogin;
