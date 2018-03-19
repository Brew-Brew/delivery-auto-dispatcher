// 이는 Test환경을 위해 필요하다. .sequelizerc를 참고.
require('./env');

module.exports = {
  [process.env.NODE_ENV]: {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "dialect": "mysql",
  }
}
