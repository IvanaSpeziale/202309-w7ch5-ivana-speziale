export const serverUrl =
  location.hostname === 'localhost'
    ? 'http//localhost:2800'
    : 'https://mi.empresa.com:2800'; // Esta linea se cambia por la de render

console.log(serverUrl);
