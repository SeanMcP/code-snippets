import React, { Component } from 'react';

class BaseLayout extends Component {
  render() {
    return (
      <div>
        <h1>I am BaseLayout.js</h1>
        {this.props.children}
      </div>
    );
  }
}

export default BaseLayout;
