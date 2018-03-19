const Sequelize = require('sequelize');

const {
  MYSQL_HOST: HOST,
  MYSQL_DATABASE: DATABASE,
  MYSQL_USER: USER,
  MYSQL_PASSWORD: PASSWORD,
} = process.env;

const db = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: 'mysql',
  pool: {
    min: 0,
    max: 5,
  },
  logging: false,
  operatorsAliases: false, // 이 옵션을 빼면 operator symbol을 쓰더라도 계속 operator symbol을 쓰라는 에러가 나온다. https://github.com/sequelize/sequelize/issues/8417
});


db.authenticate().then(() => {
  console.log('MySQL Database Connect Success');
}).catch((error) => {
  console.log('error');
});

module.exports = db;
