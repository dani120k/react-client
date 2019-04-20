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




class ThemeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bgColor: 'rgb(255, 255, 255)'
    }
  }

  componentDidMount () {
    const elem = ReactDOM.findDOMNode(this).parentNode.firstChild
    const color = window.getComputedStyle(elem).getPropertyValue('background-color')
    this.setState({
      bgColor: color || this.state.bgColor
    })
  }

  render() {

    return (
      <table className="w-100">
        <tbody>
        <tr>
          <td className="text-muted">HEX:</td>
          <td className="font-weight-bold">{ rgbToHex(this.state.bgColor) }</td>
        </tr>
        <tr>
          <td className="text-muted">RGB:</td>
          <td className="font-weight-bold">{ this.state.bgColor }</td>
        </tr>
        </tbody>
      </table>
    )
  }
}

class ThemeColor extends Component {
  render() {
    const { className, children } = this.props

    const classes = classNames(className, 'theme-color w-75 rounded mb-3')

    return (
      <Col xl="2" md="4" sm="6" xs="12" className="mb-4">
        <div className={classes} style={{paddingTop: '75%'}}></div>
        {children}
        <ThemeView/>
      </Col>
    )
  }
}


class Cex extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      large: false,
      small: false,
      primary: false,
      success: false,
      warning: false,
      danger: false,
      info: false,
      nameCex: '',
      acName: '',
      password:'',
      people: [],
    };

    this.toggle = this.toggle.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.toggleSmall = this.toggleSmall.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggleWarning = this.toggleWarning.bind(this);
    this.toggleDanger = this.toggleDanger.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.sendNewCategory = this.sendNewCategory.bind(this);
    this.handleChangeCexName = this.handleChangeCexName.bind(this);
    this.handleChangeAcName = this.handleChangeAcName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.sendToServer = this.sendToServer.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  refresh(){
    console.log("get refresh");
  }

  componentDidMount(){
    console.log(this.props.match.params.name);
    axios.get('http://localhost:8080/cex/getAll')
      .then(res => {
        this.setState({people:res.data});
      })
    //this.sendToServer()
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleLarge() {
    this.setState({
      large: !this.state.large,
    });
  }

  toggleSmall() {
    this.setState({
      small: !this.state.small,
    });
  }


  togglePrimary() {
    this.setState({
      primary: !this.state.primary,
    });

  }

  toggleSuccess() {
    this.setState({
      success: !this.state.success,
    });
  }

  toggleWarning() {
    this.setState({
      warning: !this.state.warning,
    });
  }

  toggleDanger() {
    this.setState({
      danger: !this.state.danger,
    });
  }

  toggleInfo() {
    this.setState({
      info: !this.state.info,
    });
  }

  sendNewCategory(event){
    this.sendToServer();
    this.togglePrimary();

    this.componentDidMount();
    this.render();
  }

  sendToServer(){
    var data = {
      name: this.state.nameCex
    };
    var arr;
    console.log(data);
    axios.post('http://localhost:8080/cex/add?name='+this.state.acName + '&password=' + this.state.password, data)
      .then(res => {
        console.log(res)
        arr = res.data;
        return arr;
      })
      .catch(err => console.error(err));

    this.componentDidMount();
    this.render();
  }

  testRender = () => {
    console.log(this.state.people + "hi")

    return this.state.people.map(value => {
      return (
        <a className="list-group-item list-group-item-action">
            <h5 className="list-group-item-heading">{value.name}</h5>
            <p className="list-group-item-text">Login: {value.account.name}</p>
            <p className="list-group-item-text">Password: {value.account.password}</p>
        </a>
    )
    })
  }

  handleChangeCexName(event) {
    this.setState({nameCex: event.target.value});
  }

  handleChangeDesc(event) {
    this.setState({desc: event.target.value});
  }

  handleChangeAcName(event){
    this.setState({acName:event.target.value});
  }

  handleChangePassword(event){
    this.setState({password:event.target.value})
  }

  render() {

    return (
      <div>
          <Row className="align-items-center">
            <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <Button color="primary" onClick={this.togglePrimary}>
                <i className="fa fa-lightbulb-o"></i>&nbsp;Добавить новый цех
              </Button>
              <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                     className={'modal-primary ' + this.props.className}>
                <ModalHeader toggle={this.togglePrimary}>Создание категории</ModalHeader>
                <ModalBody>
                    <TextField label="Название цеха" outlined textarea onChange={(e) => {this.handleChangeCexName(e)}}>
                        <Input name="name" inputType="text" />
                    </TextField>
                </ModalBody>
                <ModalBody>
                  <TextField label="Имя аккаунта" outlined textarea onChange={(e) => {this.handleChangeAcName(e)}}>
                    <Input name="name" inputType="text" />
                  </TextField>
                </ModalBody>
                <ModalBody>
                  <TextField label="Пароль" outlined textarea onChange={(e) => {this.handleChangePassword(e)}}>
                    <Input name="name" inputType="text" />
                  </TextField>
                </ModalBody>
                <ModalBody>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.sendNewCategory}>Сохранить</Button>{' '}
                  <Button color="secondary" onClick={this.togglePrimary}>Отменить</Button>
                </ModalFooter>
              </Modal>
            </Col>
          </Row>
        <div className="list-group">
          {this.testRender()}
        </div>

    </div>
    );
  }
}

export default Cex;
