import React, { Component } from "react";
import './ListCards.scss';

class ListCards extends React.Component {
	state = {
	}

	render() {
        console.log(this.props[0])
		return (
			<>
			<div>
                <div className='needed'>{this.props.needed}</div>
			</div>
			</>
		);
	}
}


export default ListCards;
