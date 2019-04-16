import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { Redirect, Route, Link } from "react-router-dom";
import {
  Row,
  Col,
  CardHeader,
  CardBody,
  Table,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink,
  Card, Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'
import * as axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';


class CustomComponent extends Component {
  componentDidMount(){
    console.log('test');
    //window.CustomComponent.refresh();
  }

  render() {

    return (
      <wrapper>
        <button onClick={this.props.sendFunction}>Click Here To Call OneComponent Function</button>
      </wrapper>
    );
  }

}

export default CustomComponent;
