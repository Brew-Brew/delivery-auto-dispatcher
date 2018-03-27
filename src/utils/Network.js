const SOCKET_URL=process.env.SOCKET;
const io =require('socket.io-client');
let socket;

const Network = {
  print: (orderId) => {
    console.log('주문!!!!!!!!!!',orderId);
    //일단 프린트만 테스트해보자.
    socket.emit('requestPrintRecepitOnly', {
            orderId,
      });
  },

  init: () => {

    console.log(`${SOCKET_URL} 소켓 서버로 연결을 시도합니다`);
    socket = io.connect(SOCKET_URL, {reconnect: true});
    socket.on('connect', () => {
      console.log(`${SOCKET_URL} 서버와 연결 되었습니다. `);
    });
  }
};

module.exports= Network;
