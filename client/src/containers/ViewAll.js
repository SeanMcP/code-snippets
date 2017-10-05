import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storeSnippets, fetchSnippets }  from '../actions';
import { bindActionCreators } from 'redux';

class ViewAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snippets: []
    }
  }
  render() {
    console.log('this.props on ViewAll:', this.props);
    this.props.fetchSnippets()
    console.log('this.state after fetch', this.state);
    // let renderSnippets = this.state.snippets.data.map(snippet => {
    //   return (
    //     <div key={snippet._id}>
    //       <h1>{snippet.title}</h1>
    //       <p>{snippet.code}</p>
    //       <p>{snippet.notes}</p>
    //       <p>{snippet.language}</p>
    //       <p>{snippet.tags}</p>
    //     </div>
    //   )
    // })
    return (
      <div>I will contain the snippets
        {/*renderSnippets*/}
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state on ViewAll:', state);
  return {
    // query: ''
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchSnippets: fetchSnippets
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAll);
