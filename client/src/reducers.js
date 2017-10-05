import { STORE_SNIPPETS } from './actions';
import update from 'immutability-helper';

const initialState = {
    snippets: []
}

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case STORE_SNIPPETS:
      return update(state, {
        snippets: {
          $set: action.payload
        }
      });
    default:
      return state;
  }
}

export default reducer;
