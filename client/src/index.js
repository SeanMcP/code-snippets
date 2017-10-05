import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';

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
    <BaseLayout>
      <ViewAll />
    </BaseLayout>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
