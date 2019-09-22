import React, { Component } from "react";
import './Header.scss'

class Header extends React.Component {
	render() {
		let dt = new Date();
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var mmddyyyy = months[dt.getMonth()] + ' ' +  dt.getDate() + ' ' + dt.getFullYear();
		return (
			<>
				<div className='header'>Beacon <span className='header__date'>{mmddyyyy}</span></div>
				<button onClick={this.props.goBack} className='header__logout'>Logout</button>
			</>
		);
	}
}

export default Header;