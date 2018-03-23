const Cron = require('./cron');
const {
  autoDispatcher,
} = require('./jobs');

exports.init = (callback) => {
  autoDispatcher();
  if (callback) callback(new Cron().jobs);
};
