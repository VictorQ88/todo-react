const list_url = 'http://localhost:8080/todo'
const headers = {
  headers: { 'Content-Type': 'application/json', authorization: 'Naobek4611fVAzA+fczbPCzOWQyhKn84LhcRg3n8FMA=' }
};

function getTasks() {
  const requestOptions = { ...headers }
  return fetch(list_url, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log('err: ', err);
      console.log(err.message);
      return [];
    });
}


export {  getTasks };