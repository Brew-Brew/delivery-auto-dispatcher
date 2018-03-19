require('./config/env');
const cron = require('./cron');
const db = require('./db/sequelize');
//크론이 시작되면 할당된 작업들을 실행해준다.
cron.init((jobs) => {
    console.log('cron이 시작됩니다!');
    db.authenticate();

  });
