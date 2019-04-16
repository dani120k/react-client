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
import {Link} from "react-router-dom";
import logo from './logo400x400.jpg';
import ResizeImage from 'react-resize-image'

var static_name;

class Inner extends Component {
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
      people: [],
      name: 'name',
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
  }

  componentDidMount(){
    axios.get('http://localhost:8080/product/getAll')
      .then(res => {
        this.setState({people:res.data});
      })
  }

  sendNewCategory(){
    var data = {
      name: this.state.name,
      categoryId: 1
    };
    console.log(data);
    axios.post('http://localhost:8080/product/add', data)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    this.togglePrimary();
    for(var i = 0; i< 500; i++)

      this.componentDidMount();
    this.render();
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

  testRender = () => {

    var cars =  this.state.people;
    return cars.map(value => {
      return (

        <a href="#" className="list-group-item list-group-item-action" >
          <img src={logo} className="img-rounded" alt="Cinque Terre"/>
            <h5 className="list-group-item-heading">{value.name}</h5>
            <p className="list-group-item-text">{value.name}</p><span className=" pull-right">{value.count}</span>
        </a>
      )
    })
  }

  handleChangeCat(event){
    this.setState({name: event.target.value});
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
        <div className="list-group">
          {this.testRender()}
        </div>
      </div>
    );
  }
}

export default Inner;
