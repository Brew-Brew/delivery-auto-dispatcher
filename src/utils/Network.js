const SOCKET_URL=process.env.SOCKET;
const io =require('socket.io-client');
let socket;

const Network = {

  init: () => {

    console.log(`${SOCKET_URL} 소켓 서버로 연결을 시도합니다`);
    socket = io(SOCKET_URL);
    let startDate;
    let endDate;

    socket.on('connect', () => {
      console.log(`${SOCKET_URL} 서버와 연결 되었습니다. `);
    });
    socket.on('disconnect', () => {
      console.log(`${SOCKET_URL} 서버와의 연결이 끊어졌습니다.`);
    });
    socket.on('reconnect_attempt', () => {
      console.log(`${SOCKET_URL} 서버로 재연결을 시도합니다.`);
    });
    socket.on('reconnect_error', error => {
      console.log(`${SOCKET_URL} 서버로 재연결 중 에러가 발생했습니다.`, error);
    });
    socket.on('reconnect', () => {
      console.log(`${SOCKET_URL} 서버와 재연결 되었습니다.`);
    });
    socket.on('error', (msg) => {
      console.log('error' + msg);
    });
    socket.on('whoAreYou', () => {
      socket.emit('introduceMySelf', {
        client: 'DSU'
      });
    });
  }
};

module.exports= Network;
