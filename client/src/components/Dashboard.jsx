import React, { Component } from "react";
import { Form, Button, InputGroup, FormControl, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import wifi from '../assets/wifi.jpeg';

class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
      connectedWithRecipient: false,
      inNeedOf: [],
      recipientCode: '',
      amount: '',
      category: '',
      showModal: false
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
    // axios.get('' + this.state.recipientCode).then(res => {
    //   this.setState({
    //     inNeedOf: res.data.inNeedOf
    //   });
    // });

    this.setState({
      showModal: true,
      inNeedOf: ['Food', 'Clothing']
    });
  }

  transferFunds() {
    axios.post('').then(res => {

    });
  }

  handleClose() {
    this.setState({
      showModal: false
    })
  }

  render() {
    return (
      <DashboardContainer>
        <img className="center" src={wifi}/>
        <p>Find someone in need near you...</p>
        <Button className="center" variant="primary" onClick={this.connectWithRecipient}>Search</Button>

        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Success!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You just connected with Joe!</p>

            <Form>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Joe is most in need of:</Form.Label>
                <Form.Control as="select" name="category" onChange={this.handleChange}>
                  <option>Food</option>
                  <option>Clothing</option>
                  {/* { this.state.inNeedOf.map((category, i) => (
                    <option key={i}>{{category}}</option>
                  ))} */}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Monetary value:</Form.Label>
                <Form.Control type="text" placeholder="Enter donation amount" name="amount" onChange={this.handleChange}/>
              </Form.Group>
            </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
            <Button variant="primary" onClick={this.transferFunds}>Donate Now</Button>
          </Modal.Footer>
        </Modal>
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
  img {
    width: 30px;
  }
  p {
    text-align: center;
  }
`
