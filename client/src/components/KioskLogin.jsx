import React, { Component } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { Redirect} from "react-router-dom";
import './kiosklogin.scss';
import image from '../assets/userImage.jpg';

const serverURL = 'http://localhost:2112'

class Kiosk extends React.Component {
	state = {
		code: '',
		login: null,
		data: []
	}

	componentDidMount(){
		axios.get(`http://localhost:2112/data`)
		.then(res => this.setState({data: res.data}))
	}

	formSubmit = (event) => {
		event.preventDefault();
		this.state.data.map(item => {
			if (item.code == event.target.userCode.value){
				this.setState({
					login: '/kiosk',
					code: event.target.userCode.value,
				})
			}
		})
	
	}

	render() {
		setTimeout(console.log(this.state.data), 3000)
		console.log(this.state.login)
		console.log(this.state.code);
		if (this.state.login !== null) return <Redirect to={{
			pathname: this.state.login,
			state: {code: this.state.code}}}/>
		return (
			<>
				<div className='login__container'>
					<form onSubmit={this.formSubmit} className='form__flex'> 
						<input className='form__flex-code' type='text' placeholder='Enter your code' name='userCode'></input>
						<input className='form__flex-pass' type='text' placeholder='Enter your password'></input>
						<button type='submit'>Login</button>
					</form>
				</div>
			</>
		);
	}
}


export default Kiosk;
