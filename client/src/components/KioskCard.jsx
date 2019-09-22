import React, { Component } from "react";
import './kioskcard.scss';
import * as Constants from "../utils/constants";


class Kiosk extends React.Component {
	state = {
	}

	render() {
		var tempCategory = this.props.category;
		var thing = Constants.KioskCategories.filter((item) => (item.name === tempCategory))
		return (
			<>
			<div className='kioskcardbox'>
				<img className="kioskcardbox__image" alt=""src={thing[0].img}/>
				<div className='kioskcardbox__category'>{this.props.category}</div>
                <div className='kioskcardbox__funds'>${this.props.cash}</div>
			</div>
			</>
		);
	}
}


export default Kiosk;
