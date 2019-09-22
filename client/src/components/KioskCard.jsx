import React, { Component } from "react";
import styled from 'styled-components';
import axios from 'axios';
import './kioskcard.scss';

class Kiosk extends React.Component {
	state = {
	}

	render() {
		return (
			<>
			<div className='cardbox'>
                <div className='category'>{this.props.category}</div>
                <div className='funds'>{this.props.cash}</div>
			</div>
			</>
		);
	}
}


export default Kiosk;
