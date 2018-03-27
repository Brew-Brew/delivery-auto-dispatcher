const Cron = require('../cron');
const jobName = 'autoDispatcher';
const SOCKET_URL=process.env.SOCKET;
const moment = require('moment');
const { Op } = require('sequelize');
const fetch = require('node-fetch');
const io =require('socket.io-client');
const getOrder = require('../../../database/schema/mongoDatabases/plating_orders');
const socket = io(SOCKET_URL);
const Network =require('../../utils/Network');
//자동배차와 관련한 크론 job
const {
  orderMeta,
  timeSlot,
} = require('../../../database/schema/platingDatabase');

const generateReceipt = require('../../utils/generateReceipt');

module.exports = () => {
  const cron = new Cron();
  cron.schedule(jobName, {
    second: '*/10', // for test
    // hour: '12', // utc 12 is kst 21
    // minute: '20,30',
  }, async () => {
    try {
      // 점심이거나 저녁인것중에서 접수가 안된것을 하루전날까지 가져온다.
      const orderOptions = {
        where: {
            delivery_type: 'default',
            service_type: {
              [Op.or]: ['DINNER','LUNCH']
            },
            request_time: {
              [Op.gte]: moment().subtract(24, 'hour'),
            },
        },
      };
      //주문관련 정보를 받아온다.
      const orders = await orderMeta.findAll(orderOptions);
      if(orders.length === 0){
        console.log('배송접수할 것이 없습니다.!');
      }

      //각 주문에 해당하는 timeslot정보를 가져온다.
      orders.forEach(async(od) => {
        console.log('-------주문관련정보-----------')
        console.log('주문번호',od.id);
        console.log('timeslot id: ',od.timeSlotId);
        //order의 timeslot id와 timeslot의 id 같은것 가져옴
        const timeslot = await timeSlot.findOne({
          where: {
          id: od.timeSlotId,
        }
      });

      console.log('-------배송관련정보-----------')
      //배달원하는시간과 현재시간을 체크하여 부릉 api에 접수해준다.
      // if( timeslot.timeStr- 현재시간 <=1시간) -> 접수
      // 날짜도 체크해야한다.

      //현재시간관련 즉시 실행함수
      var nowTime = (function () {
        var now = moment().format("HH:mm");
        var nowRealtime = now.split(':');
        var nowForCompare =  new Date();
        nowForCompare.setHours( nowRealtime[0]);
        nowForCompare.setMinutes( nowRealtime[1]);
          return nowForCompare;
      }());
      console.log('현재: ', moment().format("HH:mm"));

      //배송시간관련 즉시 실행함수
      var deliverTime = (function () {
      var delivery= timeslot.timeStr;
      var deliveryRealtime = delivery.split(':');
      var deliverForCompare = new Date();
      deliverForCompare.setHours( deliveryRealtime[0]);
      deliverForCompare.setMinutes( deliveryRealtime[1]);
        return deliverForCompare;
      }());
      console.log('배송원하는 시간:',timeslot.timeStr);


      var hour_gap= Math.floor((deliverTime.getTime() - nowTime.getTime())/1000/60/60);
      var min_gap= Math.round(((deliverTime.getTime() - nowTime.getTime())/1000/60)-hour_gap*60);

      //남은 시간 양수여야 실행한다.
      if(hour_gap >= 0 && min_gap >0){
        console.log('배송까지 약 ' + hour_gap + '시간 '+min_gap+'분 남았습니다.');
        if( hour_gap < 1 ){
          //접수 프로세스
          //generateReceipt 부분을 배차고에서 가져온다.
          //예외 상황을 처리해준다. 성동구 + 플팅 사내
          const order = await getOrder(od.id);
          //플팅 예외처리
          if((order.address).indexOf('논현동 122-8') > 0){
            console.log('플팅에서 시킴');
          }
          else{
            const receipt = generateReceipt(order);
            console.log(receipt);
            //여기서 프린트를 해보려는데 안되네용...
            Network.print(od.id);
            //1.
            //프로미스를  리턴안했는데도 왜 될까..?
            // await requestVroongOrder(od.id).then(function(res){
            //   console.log(`배송까지 남은시간 <= 1시간 이므로 주문번호: ${od.id}를 접수하였습니다.${res}`);
            // });

            //2.
            //프로미스를 리턴?
            // await changeDeliveryWithPrint(od.id).then(function(res){
            //   console.log('프린트도 완룡!');
            //   console.log(`${res}`);
            // });
          }
        }
      }
      else{
        console.log('배송을 원하는시간이 지났습니다!');
      }
    });

    } catch (error) {
      console.log(error);
    }
  });
};


//1. 접수관련 빅보스에서 따왔음
function requestVroongOrder(orderIdx) {
    let status = 400;
    return fetch(`https://gatewaylab.plating.co.kr/vroong/order/${orderIdx}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      status = response.status;
      return response.json();
    });
  }

//2. 빌지 출력과 deliverytype 변경관련 배차고에서 따옴
  async function changeDeliveryWithPrint(orderId) {
    return new Promise(async function(resolve, reject) {
      //generateReceipt 부분을 배차고에서 가져온다.
      const order = await getOrder(orderId);
      //영수증 포맷 생성
      const receipt = generateReceipt(order);

      let status = 400;
        fetch(`https://store.plating.co.kr/vroong/order/${orderId}`, {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            console.log(res);
            status = res.status;
            return res.json();
          })
          .then((json) => {
            console.log(json);
            if (status >= 400) {
              return reject(json);
            } else {
              socket.emit('onDeliveryTypeSettingButtonPressed', {
                orderId,
                deliveryType: 'vroong',
                receipt,
              });
              return resolve(json.message);
            }
          })
          .catch((json) => {
            console.log(json);
          });
    });
}
