const socket = new WebSocket(location.href.replace('http', 'ws') + 'ws');

const startWS = () => {
  socket.addEventListener('open', () => {
    console.log('Connected!');
    socket.send(JSON.stringify({
      type: 'connection',
      data: {
        playerName: 'Player 1',
      },
    }));
  });

  socket.addEventListener('message', (msg) => {
    console.log(msg.data);
  });

  socket.addEventListener('close', () => {
    console.log('Disconnected!');
  });
}

export default startWS;
