const pgp = require('pg-promise')(/*options*/);
var connectinfo={
  user:'postgres',
  password:'2658',
  host:'localhost',
  port:'5432',
  database:'New_database'
};
var connectstring = 'postgres://'+connectinfo.user+':'+connectinfo.password+'@'+connectinfo.host+':'+connectinfo.port+'/'+connectinfo.database;
const db=pgp(connectstring);

module.exports.db = db;