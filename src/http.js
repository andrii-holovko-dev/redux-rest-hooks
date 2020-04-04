function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw { status: response.status, statusText: response.statusText };
  }
}

function parseJSON(response) {
  return response.json();
}

export const fetchJSON = (...args) => fetch(...args).then(checkStatus).then(parseJSON);
