import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';

import BaseLayout from './components/BaseLayout';
import ViewAll from './containers/ViewAll';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';

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
          <Route exact path='/' component={ViewAll} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/profile' component={Profile} />
        </Switch>
      </BaseLayout>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
