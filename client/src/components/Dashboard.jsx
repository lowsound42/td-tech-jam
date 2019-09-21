import React, { Component } from "react";
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import { Form, Button, InputGroup, FormControl, Modal, Container, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import * as Constants from "../utils/constants";

const serverURL = 'http://localhost:2112';

class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
      connectedWithRecipient: false,
      inNeedOf: [],
      recipientCode: '',
      amount: '',
      category: '',
      showModal: false,
      isDisabled: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.connectWithRecipient = this.connectWithRecipient.bind(this);
    this.transferFunds = this.transferFunds.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  connectWithRecipient() {
    const code = 1234
    axios.get(`${serverURL}/query/` + code).then(res => {
      console.log(res);
      this.setState({
        inNeedOf: res.data,
        showModal: true
      });
      console.log(this.state.inNeedOf)
    });
  }

  handleClose() {
    this.setState({
      showModal: false
    })
  }

  setCategory(category) {
    console.log(category)
    this.setState({ category: category });
  }

  setAmount(amount) {
    console.log(amount)
    this.setState({ 
      amount: amount,
      isDisabled: false
    });
  }

  transferFunds() {
    const donateObj = 
    {
      "code": "1234",
      "category": "Clothing",
      "cash": 5
    };
    axios.post(`${serverURL}/donate`, donateObj).then(res => {
     console.log(res.data)
     this.setState({ showModal: false })
    });
  }

  render() {
    return (
      <DashboardContainer>
        <img className="center" src={Constants.Images.wifi} width="30px" alt=""/>
        <p>Find someone in need near you...</p>
        <Button className="center" variant="primary" onClick={this.connectWithRecipient}>Search</Button>

        <ModalContainer show={this.state.showModal} onHide={this.handleClose}>
          <img classname="backdrop-img" src={Constants.Images.backdrop}/>
          <div className="backdrop-color">
            <Modal.Header closeButton></Modal.Header>
            
            <Modal.Body>
              <img className="center" src={Constants.Images.joe} width="82px" alt=""/>
              <h1>Joe</h1>
              <br></br><br></br>

              <h2>I need Most</h2>
              <Row>
              { this.state.inNeedOf.map((category, i) => (
                <Col>
                  <img src={wifi} roundedcircle='true' width="15px"/>
                  <p>{category.category}</p>
                </Col>
              ))}
                { this.state.inNeedOf.map((needed, i) => (
                  <Col key={i} onClick={() => this.setCategory(needed)}>
                    <div className="bubble-needed"></div>
                    <span>{needed}</span>
                  </Col>
                ))}
              </Row>
              <br></br><br></br>

              <h2>Give Joe a donation</h2>
              <Row>
                { Constants.Categories.map((category, i) => (
                  <Col key={i}>
                    <img className="bubble-categories center" width="61px" alt=""
                         src={category.img} onClick={() => this.setCategory(category.name)}/>
                    <p>{category.name}</p>
                  </Col>
                ))}
              </Row>
              <br></br><br></br>

              { this.state.category &&
                <div>
                  <h2>Amount</h2>
                  <Row>
                  { Constants.MonetaryValues.map((amount, i) => (
                    <Col key={i}>
                      <div className="bubble-amount center" width="61px" 
                           onClick={() => this.setAmount(amount)}>
                        <p className="text-amount">${amount}</p>
                      </div>
                    </Col>
                    
                  ))}
                  </Row>
                </div>
              }
            </Modal.Body>

            <Modal.Footer>
              <button className="button-donate center" variant="primary" 
                      disabled={this.state.isDisabled} onClick={this.transferFunds}>Donate Now</button>
            </Modal.Footer>
          </div>
        </ModalContainer>
      </DashboardContainer>
    );
  }
}
  
export default Dashboard;

const DashboardContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  width: 50%;
  .center {
    display: block;
    margin: 0 auto;
  }
  p {
    text-align: center;
  }
`

const ModalContainer = styled(Modal)`
  .backdrop-img {
    position: absolute;
    width: 500px;
    top: -10px;
  }
  .backdrop-color {
    background-color: #E1E8F2;
  }
  
  .center {
    display: block;
    margin: 0 auto;
  }
  h1 {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #42404B;
    margin: 10px 0 0 0;
  }
  h2 {
    text-align: center;
    font-size: 18px;
    color: #42404B; 
  } 
  p, span {
    text-align: center;
    font-size: 14px;
    color: #615F6C;
  }

  .bubble-needed {
    border-radius: 50%;
    background-color: #91C0FF;
    cursor: pointer;
    height: 8px;
    width: 8px;

    display: inline-block;
    margin-right: 5px;
  }
  .bubble-categories {
    border-radius: 50%;
    background-color: #91C0FF;
    cursor: pointer;
    height: 61px;
    width: 61px;
  }
  .bubble-amount {
    border-radius: 50%;
    background-color: #91C0FF;
    cursor: pointer;
    height: 61px;
    width: 61px;
  }
  .text-amount{
    padding-top: 17px;
  }

  .button-donate {
    background-color: #F16522;
    width: 150px;
    height: 46px;
    color: #FFFFFF;
    border: none;
    border-radius: 23px;
    cursor: pointer;
    :disabled {
      opacity: 0.5;
    }
  }
`
