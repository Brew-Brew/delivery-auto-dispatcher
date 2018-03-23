require('./config/env');
require('babel-core/register');
require('babel-polyfill');

const mongoose = require('mongoose');
const cron = require('./src/cron');
const db = require('./src/db/sequelize');
const Network = require('./src/utils/Network');

const Socket= Network.init();
//몽고db연결
const mongodbURL = process.env.MONGODB_URL || 'mongodb://mongodb.test.plating.co.kr:27017/test';
const Mongo = mongoose.connect(mongodbURL, function () {
  console.log('몽고db와 연결되었습니다.')
});
// Network.init();
//크론이 시작되면 할당된 작업들을 실행해준다.
const Cron = cron.init((jobs) => {
    db.authenticate();

  });

async function start() {
 await Socket;
 await Mongo;
 await Cron;
}

start().then(()=>{
  console.log('소켓,몽고db,크론 모두 정상적으로 연결되었습니다.')
})
