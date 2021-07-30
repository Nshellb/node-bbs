const db = require('../database'); // 정의한 DB를 가져옴.

const self = {};

self.findUser = async () => {
    const ret = await db.raw('SELECT * FROM USER');
    return ret[0]
}

const ret = db.raw('select now()').then((item) => {console.log(item[0])})

module.exports = self;