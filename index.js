const cron = require('./cron');
require('./config/env');

//크론이 시작되면 할당된 작업들을 실행해준다.
cron.init((jobs) => {
  console.log('cron init');
  console.log(process.env.NODE_ENV);
  console.log(process.env.PORT);
});
