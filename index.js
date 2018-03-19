const cron = require('./cron');

cron.init((jobs) => {
  console.log('console init');
});
