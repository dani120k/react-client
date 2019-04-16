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
      name: 'name',
      desc: 'desc',
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
    this.handleChangeCat = this.handleChangeCat.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.sendToServer = this.sendToServer.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  refresh(){
    console.log("get refresh");
  }

  componentDidMount(){
    /*axios.get('http://localhost:8080/price/getAll')
      .then(res => {
        const people = res.data;
        this.setState({people});
      })*/
    this.sendToServer()
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
      categoryName: this.state.name,
      description: this.state.desc
    };
    var arr;
    console.log(data);
    axios.post('http://localhost:8080/price/add', data)
      .then(res => {
        console.log(res)
        this.setState({people:res.data})
        console.log(this.state.people);
        arr = res.data;
        return arr;
      })
      .catch(err => console.error(err));
  }

  testRender = () => {
    console.log(this.state.people + "hi")
    var cars =  this.state.people;
    return cars.map(value => {
      return (

        <a href="#" className="list-group-item list-group-item-action" >
          <Link to={{
            pathname: '/custom/component/' +  value.id,
            state: { fromDashboard: true }
          }} style={{ textDecoration: 'none' }}>
            <h5 className="list-group-item-heading">{value.categoryName}</h5>
            <p className="list-group-item-text">{value.description}</p><span className=" pull-right">{value.count}</span>
          </Link>
        </a>
    )
    })
  }

  handleChangeCat(event) {
    this.setState({name: event.target.value});
  }

  handleChangeDesc(event) {
    this.setState({desc: event.target.value});
  }

  render() {

    return (
      <div>
        <CardBody>
        <Card>
          <Row className="align-items-center">
            <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <Button color="primary" onClick={this.togglePrimary}>
                <i className="fa fa-lightbulb-o"></i>&nbsp;Добавить новую категорию
              </Button>
              <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                     className={'modal-primary ' + this.props.className}>
                <ModalHeader toggle={this.togglePrimary}>Создание категории</ModalHeader>
                <ModalBody>
                    <TextField label="Название категории" outlined textarea onChange={(e) => {this.handleChangeCat(e)}}>
                        <Input name="name" inputType="text" />
                    </TextField>

                </ModalBody>
                <ModalBody>
                  <TextField label="Краткое описание" outlined textarea onChange={(e) => {this.handleChangeDesc(e)}}>
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
        </Card>
      </CardBody>
        <div className="list-group">
          {this.testRender()}
        </div>

    </div>
    );
  }
}

export default Cex;
