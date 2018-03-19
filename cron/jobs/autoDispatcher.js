const Cron = require('../cron');
const jobName = 'autoDispatcher';
//자동배차와 관련한 크론 job
module.exports = () => {
  const cron = new Cron();
  cron.schedule(jobName, {
    second: '*/5', // for test
    // hour: '12', // utc 12 is kst 21
    // minute: '20,30',
  }, async () => {
    try {
      console.log('test');
    } catch (error) {
      console.log(error);
    }
  });
};
