const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => { // app.use에서 use라는 함수는 인자로 받은 함수를 app의 middleware 배열에 등록을 해준다.
    console.log('아무튼 숫자세기 입니다.');
    ctx.set("number_count", 'one'); // Header, ID
    await next(); // ctx.body = "숫자세기"; 이후 ctx를 타고 올라오면 이부분까지 실행이 된 상태.
    console.log('숫자 세기 끝');
});

app.use(async (ctx, next) => {
    console.log('1. one');
    await next(); // 2. two 출력 함수 호출
});

app.use(async (ctx, next) => {
    console.log('2. two');
    await next(); // 3. three 출력 함수 호출
});

app.use(async (ctx, next) => {
    console.log('3. three');
    await next(); // 4. four 출력 함수 호출
});

app.use(async (ctx, next) => {
    console.log('4. four');
    await next(); // 5. five 출력 함수 호출
});

app.use(async (ctx, next) => {
    console.log('5. five');
    ctx.body = "숫자세기"; // 순차 실행이 완료되면 호출되어 왔던 순서대로 ctx를 따라 올라가며 실행되지 않은 구문들은 실행하며 올라감.
});

app.listen(3000);