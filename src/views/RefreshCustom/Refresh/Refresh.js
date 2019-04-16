import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';


class Refresh extends Component {
  componentDidMount(){
    window.CustomComponent.refresh();
  }
}

export default Refresh;
