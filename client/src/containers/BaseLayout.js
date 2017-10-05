import React, { Component } from 'react';

import Header from '../components/Header';

class BaseLayout extends Component {
  render() {
    return (
      <div className="">
        <Header />
        <main className="container-fluid">
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default BaseLayout;
