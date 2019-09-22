import React, { Component } from "react";
import './kioskcard.scss';
import * as Constants from "../utils/constants";


class Kiosk extends React.Component {

	render() {
		var tempCategory = this.props.category;
		console.log(tempCategory);
		var thing = Constants.KioskCategories.filter((item) => (item.name === tempCategory))
		console.log(thing);
		return (
			<>
			<div className='kioskcard'>
				<img className="kioskcard__image" alt=""src={thing ? thing[0].img : null}/>
				<div className='kioskcard__bottom'>
					<div className='kioskcard__bottom-category'>{this.props.category}</div>
						<div className='kioskcard__bottom-funds'>${this.props.cash}</div>
				</div>
			</div>
			</>
		);
	}
}


export default Kiosk;
