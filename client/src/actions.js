export const STORE_SNIPPETS = 'STORE_SNIPPETS';

export function storeSnippets(snippetArray) {
  return {
    type: 'STORE_SNIPPETS',
    payload: snippetArray
  }
}

export const fetchSnippets = () => {
  return (dispatch, getState) => {
    fetch('http://localhost:3030/api/auth/snippet')
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch(storeSnippets(data.data));
      })
  }
}

export const postSignup = () => {
  let form = new FormData(document.getElementById('searchForm'));
  fetch('http://localhost:3030/api/auth/register', {
    method: 'POST',
    body: form
  })
}
