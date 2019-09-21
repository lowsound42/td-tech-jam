import React, { Component } from "react";
import styled from 'styled-components';
import axios from 'axios';
import './kiosk.scss';
import image from '../assets/userImage.jpg';
import KioskCard from './KioskCard';

const serverURL = 'http://localhost:2112'

class Kiosk extends React.Component {
	state = {
		userName: "test",
		inNeedOf: []
	}

	componentDidMount(){
		axios.get(`${serverURL}/data/` + this.props.location.state.code
		)
		.then(res => {
			this.setState(
				{
					code: this.props.location.state.code,
					userName: res.data.name,
					inNeedOf: res.data.inNeedOf
				})
		})
	}

	goBack = () => {
		this.props.history.goBack();
	}

	render() {
		console.log(this.props.location.state.code);
		var items = this.state.inNeedOf;

		return (
			<>
			<button onClick={this.goBack} className='logout'>Logout</button>
			<div className='flexbox'>
					<div className='image__container'>
						<img className='image__container-image' src={image}></img>
						<p className='image__container-name'>User Name: {this.state.userName}</p>
						<p className='image__container-code'>User Code: {this.state.code}</p>
					</div>
					<div className='card__container'>
						<h1 className='card__container-header'>Donations to Redeem</h1>
						<div className='card__container-cards'>
								{this.state.inNeedOf ? this.state.inNeedOf.map((item => {
                        return <KioskCard {...item}/>})) : <div>loading...</div>}
						</div>
						<div className='card__container-buttons'>
							<button className='card__container-buttons--button'>Say Thanks</button>
							<button className='card__container-buttons--button'>Help</button>
						</div>
					</div>
			</div>
			</>
		);
	}
}


export default Kiosk;
