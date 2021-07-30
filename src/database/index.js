require('dotenv').config();

const db = require('knex')({
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : '',
        database : 'study_db'
    }
});

const ret = db.raw('select now()').then((item) => {console.log(item[0])})

module.exports = db;