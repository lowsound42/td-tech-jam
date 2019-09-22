import React, { Component } from "react";
import './ListCards.scss';
import * as Constants from "../utils/constants";


class ListCards extends React.Component {
	state = {
	}

	render() {
		var tempCategory = this.props.needed;
		var thing = Constants.KioskCategories.filter((item) => (item.name === tempCategory))
		console.log(thing)
		return (
			<>
			<div>
				<img className="listcard__image" alt=""src={thing ? thing[0].img : null}/>
                <div className='listcard__needed'>{this.props.needed}</div>
			</div>
			</>
		);
	}
}

export default ListCards;
