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
      name: '',
      price: 0,
      desc: '',
      cex: [],
      up: false,
      pathToFile:'./logo400x400.jpg',
      file:'',
      bages:['cex1', 'cex2'],
    };

    this.toggle = this.toggle.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.sendNewCategory = this.sendNewCategory.bind(this);
    this.handleChangeCat = this.handleChangeCat.bind(this);
    this.sendToServer = this.sendToServer.bind(this);
    this.updateCex = this.updateCex.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.sendFile = this.sendFile.bind(this);
    this.renderCex = this.renderCex.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderBages = this.renderBages.bind(this);
    this.updateThis = this.updateThis.bind(this);
  }

  sendFile(){
    /*let formData = new FormData();
    formData.append(this.state.pathToFile, this.file);
    console.log(formData);
    axios.post( 'localhost:8080/picture/file',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    ).then(function(){
      console.log('SUCCESS!!');
    })*/
  }


  componentDidMount(){
    console.log(this.props.match.params.name);
    axios.get('http://localhost:8080/product/getAll?name='+this.props.match.params.name)
      .then(res => {
        this.setState({people:res.data});
      })
    var cars = [];
    axios.get('http://localhost:8080/cex/getAll')
      .then(res => {
        cars = res.data;
        this.setState({cex:res.data});
        return cars;
      })
  }

  sendToServer(){
    var data = {
      name: this.state.name,
      price: this.state.price,
      desc: this.state.desc,
      pathToImage: this.state.pathToFile,
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

  deleteProduct(e){
    console.log(e)
    axios.get('http://localhost:8080/product/delete?name='+e)
      .then(res => {
      })
    this.componentDidMount();
    this.render()
  }

  handleClick(e){
    console.log('ffsk')
    this.state.bages.push(e);
    console.log(this.state.bages)
  }

  renderCex(){
      return this.state.cex.map(value => {
        return (
        <Dropdown.Item key={value.name}>
          <div onClick={this.handleClick(value.name)}>
            {value.name}
          </div>
        </Dropdown.Item>
        )
      })
  }

  renderBages(){
    var arr = ['cex1','cex2']
      return arr.map(value => {
        return (
          <Badge className="pull-right" variant="primary">{value}</Badge>
        )
      })
  }


  testRender = () => {
    console.log(this.state.people);
    return this.state.people.map(value => {
      return (
        <div id={value.id} key={value.id} aria-disabled={true}>
          <CardBody>
          <a className="list-group-item list-group-item-action" aria-disabled={true}>
            <Row>
              <Col xs="6" sm="4"></Col>
              <Col xs="6" sm="4"></Col>
              <Col sm="4">
                <Button className="pull-right" color="danger" onClick={e => {this.deleteProduct(value.name)}} >Удалить</Button>
                <Button className="pull-right" color="secondary" onClick={this.updateThis}>Редактировать</Button>
              </Col>
            </Row>
            <img src={logo} width="100" height="100" className="img-rounded" alt="Cinque Terre"/>
            <Row>
              <Col xs="6" sm="4"></Col>
              <Col xs="6" sm="4"></Col>
              <Col sm="4">
                <DropdownButton id="dropdown-basic-button" title="Цеха" className="pull-right">
                  {this.renderCex()}

                </DropdownButton>
              </Col>
            </Row>
            <h5 className="list-group-item-heading">{value.name}</h5>
            <p className="list-group-item-text">{value.name}</p>
            <Row>
              <Col xs="6" sm="4"></Col>
              <Col xs="6" sm="4"></Col>
              <Col sm="4">
                {this.renderBages()}
              </Col>
            </Row>
            <Row>
              <Col xs="6" sm="4"></Col>
              <Col xs="6" sm="4"></Col>
              <Col sm="4">
                <span className="pull-right">Стоимость: {value.price}</span>
              </Col>
            </Row>
          </a>
          </CardBody>
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

  updateThis(e){
    this.togglePrimary();
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
                    <TextField label="Название продукта" value={this.state.name} defaultValue={this.state.name} outlined textarea onChange={(e) => {this.handleChangeCat(e)}}>
                      <Input name="name" inputType="text" />
                    </TextField>
                  </ModalBody>
                  <ModalBody>
                    <TextField label="Цена" value={this.state.price}  defaultValue={this.state.price} outlined textarea onChange={(e) => {this.handleChangePrice(e)}}>
                      <Input name="name" inputType="text" />
                    </TextField>
                  </ModalBody>
                  <ModalBody>
                    <TextField label="Состав" value={this.state.desc  }  defaultValue={this.state.desc} outlined textarea onChange={(e) => {this.handleChangeDesc(e)}}>
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
          { this.testRender()}
        </div>

      </div>
    );
  }
}

export default Inner;
