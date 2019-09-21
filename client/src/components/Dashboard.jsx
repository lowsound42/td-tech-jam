import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import wifi from '../assets/wifi.jpeg';

const axiosInstance = axios.create({
  baseURL: 'https://api.td-davinci.com/api',
  timeout: 20000,
  headers: {
    'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiYWM4YzUwNjktYjhiZi0zZjdkLTk3ZTQtZTdlYjA3MTk5OTMzIiwiZXhwIjo5MjIzMzcyMDM2ODU0Nzc1LCJhcHBfaWQiOiIwNDkxNTYxMy1kNjM2LTQyN2ItODI0OS0wYmVjYzIxMTk1YTEifQ.WWVRJu-6ivSzvxK4vWs5Ves0qGFW8FcWZupBNiCmSNE'
  }
});
const donorAccountId = 'c0d290a8-5013-4f04-ac0d-526307b2f39e';
// const shelterAccountId = 'f24b9bc6-aad9-4f21-8e4d-bc30fb3d6c30'; //random
const shelterAccountId = 'bb1ca4ad-f0d7-4c72-9183-2abbf01f8e3a';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipientCode: '',
      amount: '',
      category: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit() {
    console.log('Form fields:')
    console.log(this.state);

    axiosInstance.get('/accounts/' + donorAccountId).then(donorAccount => {
      console.log('Donor account:');
      console.log(donorAccount.data);

      // axiosInstance.get('/accounts/self').then(res => {
      //   console.log('Shelter account:')
      //   console.log(res.data);
      // })

      if (donorAccount.data.result.bankAccount.balance > this.state.amount) {
        console.log('Donor has sufficient funds!');
        const requestBody = {
          "amount": this.state.amount,
          "currency": "CAD",
          "fromAccountId": donorAccountId,
          "receipt": "{ \"Note\": \"Thanks for being such a loyal user of my app!\" }",
          "toAccountId": shelterAccountId
        }

        axiosInstance.post('/transfers', requestBody).then(transferResponse => {
          console.log('Transfer from donor to shelter:');
          console.log(transferResponse.data);
        });
      } else {
        console.log('Donor does not have sufficient funds!')
      }

    });
  }

  render() {
    return (
      <DashboardContainer>
        <Form>
          <BeakonContainer>
            <img src={wifi}/>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Code" name="recipientCode" onChange={this.handleChange}/>
            </Form.Group>
          </BeakonContainer>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Donation type:</Form.Label>
            <Form.Control as="select" name="category" onChange={this.handleChange}>
              <option>Food</option>
              <option>Clothing</option>
              <option>Hygiene</option>
              <option>Money</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Monetary value:</Form.Label>
            <Form.Control type="text" placeholder="Enter donation amount" name="amount" onChange={this.handleChange}/>
          </Form.Group>

          <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
        </Form>
      </DashboardContainer>
    );
  }
}
  
export default Dashboard;

const DashboardContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
`
const BeakonContainer = styled.div`
  max-width: 70px;
  margin: 0 auto;
  img {
    margin: 0 auto;
    display: block;
    width: 30px;
    margin-bottom: 10px;
  }
`