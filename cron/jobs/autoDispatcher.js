const Cron = require('../cron');
const jobName = 'autoDispatcher';
const moment = require('moment');
const { Op } = require('sequelize');
//자동배차와 관련한 크론 job
const {
  orderMeta,
  timeSlot,
} = require('../../database/schema/platingDatabase');

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
      const orders = await orderMeta.findAll(orderOptions);
      orders.forEach(async(od)=>{
        console.log('주문번호',od.id);
        console.log('timeslot id: ',od.timeSlotId);
        //긱 주문에 해당하는 timeslot정보 가져옴.
        const timeslot = await timeSlot.findOne({
          where: {
          id: od.timeSlotId,
        }
      });
      //배달원하는시간과 현재시간을 체크하여 부릉 api에 접수해준다.
      // if( timeslot.timeStr- 현재시간 <=1시간) -> 접수

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
      console.log('배송까지 약 ' + hour_gap + '시간 '+min_gap+'분 남았습니다.');
      console.log('--------- 배송 접수 현황을 다시 체크중입니다. ----------------');
      });



    } catch (error) {
      console.log(error);
    }
  });
};
