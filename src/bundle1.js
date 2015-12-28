import React, { Component } from 'react';
import { render } from 'react-dom';

class ComponentOne extends Component {

  render() {
    return (
      <div>
        {this.props.text}
      </div>
    );
  }

}

let elem = document.querySelector('#root');
render(
  <ComponentOne text={'Hello I\'m Bundle1'} />,
  elem
)
