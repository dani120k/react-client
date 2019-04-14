import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
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

class CustomComponent extends Component {
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
      name: 'Hello!',
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
    this.handleChange = this.handleChange.bind(this);

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
    console.log(this.state.name)
    this.togglePrimary()

    this.render();
  }

  renderTable = () => {
    var cars = ["Saab", "Volvo", "BMW"];
    return cars.map(value => {
      return (
        <table>
          <tr>
            <td>Feedback ID</td>
            <td>{value}</td>
          </tr>
          <tr>
            <td>Poster ID</td>
            <td>{value}</td>
          </tr>

        </table>
      )
    })
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  render() {

    return (
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
                <TextField label="Название категории" outlined textarea onChange={(e) => {this.handleChange(e)}}>
                  <div>
                  <Input name="name" inputType="text" />
                  </div>
                </TextField>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.sendNewCategory}>Сохранить</Button>{' '}
                <Button color="secondary" onClick={this.togglePrimary}>Отменить</Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>

        <CardHeader>
          <i className="fa fa-align-justify"></i> Список категорий
        </CardHeader>
        <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
          <Button block outline color="dark">Dark</Button>
        </Col>
        <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
          <Button block outline color="dark">Dark</Button>
        </Col>
        <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
          <Button block outline color="dark">Dark</Button>
        </Col>
        <div>{(this.state.name == "test")?this.renderTable():console.log('no')}</div>;

      </Card>
    </CardBody>
    );
  }
}

export default CustomComponent;
