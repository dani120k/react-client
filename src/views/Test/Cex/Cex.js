import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


class Cex extends Component{
  componentDidMount(){
    console.log('test');
    //window.WorkWithCex.refresh();
  }

  render() {

    return (
      <wrapper>
        <button onClick={this.props.sendFunction}>Click Here To Call OneComponent Function</button>
      </wrapper>
    );
  }
}

export default Cex;
