import React, { Component } from 'react';
import { render } from 'react-dom';

class ComponentTwo extends Component {

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
  <ComponentTwo text={'Hello I\'m Bundle2'} />,
  elem
)
