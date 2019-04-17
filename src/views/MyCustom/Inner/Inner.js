import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
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

class Inner extends Component {
  constructor(props){
    static_name = props.match.params.name;
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
      people: [],
      name: 'name',
      price: 0,
      desc: '',
      cex: [],
    };

    this.toggle = this.toggle.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.sendNewCategory = this.sendNewCategory.bind(this);
    this.handleChangeCat = this.handleChangeCat.bind(this);
    this.sendToServer = this.sendToServer.bind(this);
    this.updateCex = this.updateCex.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
  }


  componentDidMount(){
    console.log(window.location.pathname);
    console.log(this.props.location.pathname);
    axios.get('http://localhost:8080/product/getAll?name='+static_name)
      .then(res => {
        this.setState({people:res.data});
      })
  }

  sendToServer(){
    var data = {
      name: this.state.name,
      price: this.state.price,
      desc: this.state.desc,
      pathToImage: "test"
    };
    console.log(data);
    console.log("naa,e " + static_name)
    axios.post('http://localhost:8080/product/add?name='+static_name, data)
      .then(res => {
        console.log(res)
        this.setState({people:res.data})
        console.log(this.state.people);
        var arr = res.data;
        return arr;
      })
      .catch(err => console.error(err));

    this.componentDidMount();
    this.render();
  }

  sendNewCategory(event){
    console.log("hi");
    this.sendToServer();
    this.togglePrimary();

    this.componentDidMount();
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }


  togglePrimary() {
    this.setState({
      primary: !this.state.primary,
    });

  }




  testRender = () => {
    console.log(this.state.people);
    var cars =  this.state.people;
    return this.state.people.map(value => {
      return (
        <div>
          <a href="#" className="list-group-item list-group-item-action" aria-disabled={true}>
            <img src={logo} width="100" height="100" className="img-rounded" alt="Cinque Terre"/>
            <DropdownButton id="dropdown-basic-button" title="Dropdown button">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>;
            <h5 className="list-group-item-heading">{value.name}</h5>
            <p className="list-group-item-text">{value.name}</p><span className=" pull-right">Стоимость: {value.price}</span>
            <Badge variant="primary">Primary</Badge> <Badge variant="primary">Primary</Badge>
          </a>
        </div>
      )
    })
  }

  updateCex(){
    axios.get('http://localhost:8080/cex/getAll')
      .then(res => {
        this.setState({cex:res.data});
      })
  }

  handleChangeCat(event){
    this.setState({name: event.target.value});
  }

  handleChangePrice(event){
    this.setState({price: event.target.value});
  }

  handleChangeDesc(event){
    this.setState({desc: event.target.value});
  }

  render() {
    const prodId = this.props.match.params.name;


    return (
      <div>

            <Row className="align-items-center">
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button color="primary" onClick={this.togglePrimary}>
                  <i className="fa fa-lightbulb-o"></i>&nbsp;Добавить новое блюдо
                </Button>
                <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                       className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={this.togglePrimary}>Создание блюда</ModalHeader>
                  <ModalBody>
                    <TextField label="Название продукта" outlined textarea onChange={(e) => {this.handleChangeCat(e)}}>
                      <Input name="name" inputType="text" />
                    </TextField>
                  </ModalBody>
                  <ModalBody>
                    <TextField label="Цена" outlined textarea onChange={(e) => {this.handleChangePrice(e)}}>
                      <Input name="name" inputType="text" />
                    </TextField>
                  </ModalBody>
                  <ModalBody>
                    <TextField label="Состав" outlined textarea onChange={(e) => {this.handleChangeDesc(e)}}>
                      <Input name="name" inputType="text" />
                    </TextField>
                  </ModalBody>
                  <ModalBody>
                    <label className="upload">
                      <input type="file" accept="image/jpeg,image/png,image/gif"/>
                      <p className="filename"></p>
                    </label>
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
        <div className="list-group" id='example'>
          {this.updateCex()}{ this.testRender()}
        </div>

      </div>
    );
  }
}

export default Inner;
