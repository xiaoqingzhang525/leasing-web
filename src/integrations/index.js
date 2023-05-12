export const fetchRequest = async (url = '', data = {}, type = 'GET') => {
  const baseUrl = 'http://localhost:3001';
  type = type.toUpperCase();
  url = baseUrl + url;

  if (type === 'GET') {
    let dataStr = '';
    Object.keys(data).forEach((key) => {
      dataStr += key + '=' + data[key] + '&';
    });
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
  }
  let requestConfig = {
    credentials: 'same-origin',
    method: type,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'force-cache',
  };

  if (type === 'POST') {
    Object.defineProperty(requestConfig, 'body', {
      value: JSON.stringify(data),
    });
  }
  try {
    const response = await fetch(url, requestConfig);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    throw new Error(error.message);
  }
};
