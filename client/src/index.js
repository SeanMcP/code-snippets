import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';
// import 'bootstrap';

import BaseLayout from './components/BaseLayout';
import ViewAll from './containers/ViewAll';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const store = createStore(
    reducers,
    applyMiddleware(reduxThunk)
);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <BaseLayout>
        <Switch>
          <Route path='/' component={ViewAll} />
        </Switch>
      </BaseLayout>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
