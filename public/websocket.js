const socket = new WebSocket(location.href.replace('http', 'ws') + 'ws');

const startWS = () => {
  socket.addEventListener('open', () => {
    console.log('Connected!');
    socket.send('bom dia!');
  });

  socket.addEventListener('message', (msg) => {
    console.log(msg.data);
  });
}

export default startWS;
