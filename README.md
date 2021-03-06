유튜브의 node.js 강의 개발이다.
(https://www.youtube.com/channel/UC5ChZXCogqV99ju-M0TNNfw)

아래는 개발노트

1. node.js 설치와 간단한 사용법
node.js : javascript runtime 
runtime : 프로그램이 실행되고 있을때 존재하는 곳, 프로그래밍 언어가 구동되는 환경.

node.js의 등장으로 JS가 브라우저에만 국한되는것이 아니게 되었음.


[node 파일명.확장자] 형태로 실행 가능 (ex. node index.js)


터미널에 node 만 입력하여 실행시 node 런타임이 실행됨.
(취소 : ctrl + c)






2. koa 사용법
express 팀의 새로운 프레임 워크.
koa는 express와 달리 async와 await를 지원한다. -> call-back에서 자유롭고 코드가 간결하다.
(express는 async와 await를 지원하지 않기에 permit 처리시 call-back을 사용.)

koa 설치. -> npm install koa

src/index.js 에 koa code 작성
node src로 실행.

브라우저로 localhost:3000으로 접속하여 결과확인.
ctrl + c로 node runtime 종료.


nodemon ( npm install -g nodemon )
디렉터리에서 파일 변경이 감지될 때 node 응용 프로그램을 자동으로 다시 시작하여 node.js 기반 응용 프로그램을 개발하는 데 도움이 되는 도구이다.

nodemon --watch src/ src 명령으로 구동시
자동으로 코드 변화를 확인하는것을 터미널에서 확인 할 수 있다.
(현재 단계에서는 브라우저 페이지 refresh가 필요하다.)

node를 start시 nodemon 사용을 위해 [npm init] 명령으로 package.json 생성 (모두 enter)
package.json의 script 부분에 start 구문 작성.

앞으로는 npm start로 node runtime을 구동 할 수 있다.



koa는 middleware 함수의 실행으로 이루어져 있다. 
index.js에서 작성한 app.use에서 use라는 함수는 인자로 받은 함수를 app의 middleware 배열에 등록을 해준다.

middleware 배열에 있는 함수를 배열의 첫요소부터 차례로 실행해주는것이 koa framework의 특징이다.

middleware 배열에 들어간 함수는 ctx와 next라는 인자를 가지고 있다.
ctx는 요청 하나에대한 context를 나타내며, next는 다음 middleware 함수를 나타낸다.
Promise를 return한다.

함수는 등록된 순서대로 위에서 아래로 실행된다.

크롬 개발자 도구 (ctrl+shift+i) network 탭의 localhost -> Response Headers(응답헤더)에서 ctx.set을 통한 Header: ID를 확인할 수 있다.
터미널에서도 순차실행결과를 확인할 수 있다.
(대부분의 브라우저는 /favicon.ico를 호출하기 위해 한 번 더 같은 url을 호출하기 때문에 2번 출력될 수 있다.)






3. koa-router 사용하기
koa-router 설치 -> npm install --save koa-router

router.get(~) 을 통해서 접속 경로마다의 요청 페이지를 다르게 설정 할 수 있다.






4.knext.js로 mysql과 연결하기
mysql 설치. https://opentutorials.org/course/3161/19532

https://bitnami.com/stack/wamp -> Download install 진행(비로그인)

mariaDB 대신 mySQL이 포함된 버전.
https://downloads.bitnami.com/files/stacks/wampstack/7.1.31-0/bitnami-wampstack-7.1.31-0-windows-x64-installer.exe


설치된 파일 실행후 설치 위치 확인.

MySQL은 다중 사용자 프로그램이기 때문에 root 계정 설정이 필요하다. 비밀번호 설정후 진행. cloud 서비스는 해제.

설치 이후 Manage Servers 에서 MySQL 확인 가능. Start/Stop으로 서비스 제어가능.

cmd로 db 실행파일이 있는 위치까지 이동후 [mysql -uroot -p] 입력하고 비밀번호를 입력하여 실행 가능.

cmd로 접속후 db 생성 (https://futurists.tistory.com/11)

CREATE DATABASE study_db default CHARACTER SET UTF8; study_db 라는 데이터 베이스를 생성하고 한글을 사용할 수 있는 UTF8로 문자열을 저장
SHOW databases; // DB 목록 보기


knex 설치 후 DB 연결. ( https://knexjs.org/ DB 생성.)
knex는 DB software를 위한 query builder 이다.

npm install knex --save // knex npm 모듈.
npm install mysql --save // mysql을 사용하기 위한 npm 모듈.
//npm install mariadb // mariadb npm 모듈.
//npm i --save-dev knex-mariadb // knex-mariadb npm 모듈.

npm install --save dotenv // .env -> (https://hudi.kr/node-js-dotenv-%ED%99%98%EA%B2%BD-%EB%B3%80%EC%88%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/)

프로젝트 root 경로에 .env 파일을 생성하고 작성.


database 디렉토리 생성 후 index.js 작성.

DB 작성

use study_db;

CREATE TABLE `USER` (
    user_id INT(11) auto_increment NOT NULL,
    user_name VARCHAR(32) NOT NULL,
    created_at datetime NOT NULL,
    update_At datetime default NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE CONTENT (
    content_id INT(11) auto_increment NOT NULL,
    title VARCHAR(32) NOT NULL,
    context text NOT NULL,
    created_at datetime NOT NULL,
    update_At datetime default NULL,
    PRIMARY KEY (content_id)
);

CREATE TABLE COMMENT (
    comment_id INT(11) auto_increment NOT NULL,
    user_id INT(11) NOT NULL,
    content_id INT(11) NOT NULL,
    context VARCHAR(32) NOT NULL,
    created_at datetime NOT NULL,
    update_At datetime default NULL,
    PRIMARY KEY (comment_id)
);

CREATE TABLE SUB_COMMENT (
    sub_comment_id INT(11) auto_increment NOT NULL,
    user_id INT(11) NOT NULL,
    comment_id INT(11) NOT NULL,
    context VARCHAR(32) NOT NULL,
    created_at datetime NOT NULL,
    update_At datetime default NULL,
    PRIMARY KEY (sub_comment_id)
);


데이터 입력

INSERT INTO `USER`
values (null, 'lelana', now(), null);


model > index.js 생성후 기존의 db import 및 async 사용 함수 작성

main index.js에 model > index.js import 후 await 사용 호출.

브라우저 접속시 data를 받아옴을 확인할 수 있음.







5. Vue 프로젝트와 node.js 서버 연결하기
[기존 작업 과정]
1) koa 설치. -> npm install koa
2) nodemon ( npm install -g nodemon )
3) node를 start시 nodemon 사용을 위해 [npm init] 명령으로 package.json 생성 (모두 enter)
package.json의 script 부분에 start 구문 작성.
앞으로는 npm start로 node runtime을 구동 할 수 있다.
4) npm install --save koa-router
5) npm install knex --save // knex npm 모듈.
6) npm install mysql --save // mysql을 사용하기 위한 npm 모듈.

[강의]
cors 설치 npm install @koa/cors --save
Cross Origin Resource Sharing 의 약자로 서로 다른 도메인에서 리소스를 요청하게 되면 보안상의 이유로 교차 출저 HTTP 요청을 제한하는것이다.

koabody ( npm install koa-body )
글을 요청 및 수정시 POST 요청을 사용.
client에서 보낸 데이터를 쉽게 parsing 해서 가져올수 있게 함.












dotenv ( npm install dotenv )


cors ( npm install @koa/cors --save )
Cross Origin Resource Sharing 의 약자로 서로 다른 도메인에서 리소스를 요청하게 되면 보안상의 이유로 교차 출저 HTTP 요청을 제한하는것이다.
