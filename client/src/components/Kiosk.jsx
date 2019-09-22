import React, { Component } from "react";
import axios from 'axios';
import './kiosk.scss';
import KioskCard from './KioskCard';
import Header from './Header';
import ListCards from './ListCards';
import * as Constants from "../utils/constants";

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
					inNeedOf: res.data.inNeedOf,
					needed: res.data.needed
				})
		})
	}

	goBack = () => {
		this.props.history.goBack();
	}

	render() {
		console.log(this.props.location.state.code);
		console.log(this.state);
		var items = this.state.inNeedOf;

		return (
			<>
			<Header goBack={this.goBack}/>
			<div className='flexbox'>
					<div className='image__container'>
						<img className='image__container-image' src={Constants.Images.joe}></img>
						<p className='image__container-name'>{this.state.userName}</p>
						<p className='image__container-location'>Location: Toronto</p>
						<p className='image__container-code'>Donation Code: {this.state.code}</p>
						<div className='image__container-list'>{this.state.needed ? this.state.needed.map(((item, i) => {
						return <ListCards needed={this.state.needed[i]}/>})) : <div>loading...</div>}</div>
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
