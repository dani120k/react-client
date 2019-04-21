import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import {
  Row,
  Col,
  CardHeader,
  CardBody,
  Card, Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import * as axios from "axios";
import logo from './logo400x400.jpg';
import { Badge } from 'reactstrap';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';

var static_name;

class CurrComponent extends Component{
  constructor(props){
    static_name = props.name;
    console.log("props " + props)
    super(props)
    console.log(static_name + " " + props)
    this.state = {
      data: []
    };

    this.testRender = this.testRender.bind(this);

  }

  componentDidMount(){
    fetch('http://localhost:8080/product/test?name=' + static_name)
      .then(response => response.json())
      .then((jsonData) => {
        console.log('i')
        console.log(jsonData)
        console.log('i')
        this.setState({data:jsonData})
      })
      .catch((error) => {
        console.error(error)
      })


  }

  testRender = () => {
    console.log('ty')
    console.log(this.state.data.length);
    return this.state.data.map(value => {
      console.log('fsdfsd')
      return (
        <Badge className="pull-right" variant="primary">{value.name}</Badge>
      )
    })

  }

  render(){

    return (
      <div>
        {console.log(this.testRender())}
        {this.testRender()}
      </div>

    )
  }
}

export default CurrComponent;
