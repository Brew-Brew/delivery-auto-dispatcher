const cron = require('node-cron');
// const { log } = require('../utils');

let instance = null;

function validate(name, string) {
  if (!cron.validate(string)) {
    throw new Error(log(`Cron Job '${name}' Validation False: ${string}`));
  }
}

function generateCronString({
  second = '0',
  minute = '*',
  hour = '*',
  dayOfMonth = '*',
  month = '*',
  dayOfWeek = '*',
}) {
  // const { second, minute, hour, dayOfMonth, month, dayOfWeek } = timeObject;
  const string = `${second} ${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
  return string;
}

module.exports = class Cron {
  constructor(){
  //instance를 cron으로 넣어준다.
    if (!instance) {
      instance = this;
    }
    this.jobs = {};
    return instance;
  }

  schedule(name, timeObject, doFunction) {
    const string = generateCronString(timeObject || {});
    validate(name, string);
    this.jobs[name] = {};
    this.jobs[name].process = cron.schedule(string, doFunction, false);
    this.jobs[name].string = string;
    this.start(name);

    return this.jobs[name];
  }

  stop(name) {
    this.jobs[name].process.stop();
    console.log('start');
  }

  start(name) {
    this.jobs[name].process.start();
    console.log('stop');
  }
};
