const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', ctx => { // 메인페이지 접속 경로
    ctx.body = '메인 페이지 입니다.';
});

router.get('/other/:group', ctx => { // /other/XXX 접속시 XXX 문구가 그대로 페이지에 출력됨을 볼수 있다.
    const { group } = ctx.params; // group 값을 url과 page 모두에서 공유함을 알 수 있다.
    ctx.body = `${group}의 페이지 입니다.`;
});

router.get('/number', ctx => {
    const { number_alphabet } = ctx.query; // ? 뒤의 query 값.
    console.log(ctx.query);
    ctx.body = `이 페이지는 ${number_alphabet}번째 페이지 입니다.`; // ES6 명세에서 추가된 자바스크립트 문법인 백틱(`)을 활용. 여러개의 ${~} 사용가능.
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);

// http://localhost:3000/number?number_alphabet=one&id=3 형태로 접속