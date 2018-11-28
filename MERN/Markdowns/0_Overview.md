# App overview 

## What' we are going to build

We are PM

1. 우리는 현재 서비스를 제공중인 스타트업의 오너다.
2. 우리는 사용자의 피드백을 받고싶다
3. 사용자들에게 피드백을 달라는 요청을 담은 이메일을 보내자
4. 사용자의 피드백을 모아서 표로 보여준다.
5. 오너들은 서비스를 개선한다.

## Detail

피드백을 받는 앱을 만들 예정이다.

1. Google OAuth 를 통해 회원가입
2. email 크레딧을 위해 stripe 을 통해 돈을 지불한다.
3. 사용자는 'campaign' 을 생성한다.
4. 사용자가 이메일을 보낼 이메일 목록을 입력한다.
5. 우리는 설문을 보내는 이메일을 보내준다.
6. email 에 링크가 있고, 링크에 들어가면 피드백을 줄 수 있다.
7. 피드백들을 tabulate 한다.
8. 리포트를 만들어 보내준다.

## Tech Stack

1. Express Server + MongoDB + Mongoose + PassportJS
2. Stripe + MongoDB
3. React + Redux
4. Email Provider + Express + Mongo

## Express server with Heroku setup

```sh
$ pwd
/.../.../MERN
$ mkdir server
$ cd server
$ npm init -y
$ npm i express
$ touch index.js
$ touch .gitignore
```

`server/index.js`

```js
const express = require('express'); 
const app = express();

app.get('/', (req, res) => {
  res.send({ happy: 'hacking '});
});

// Dynamic Port binding
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log('hi')});
```

`server/package.json`

```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "engines": {
    "node": "10.13.0", *
    "npm": "6.4.1" *
  },
  "scripts": {
    "start": "node index.js" *
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.4"
  }
}

```

`server/.gitignore`

```
node_modules/
```

## Git setting

```sh
$ pwd
/.../.../MERN/server
$ git init
$ git add -A
$ git commit -m 'Init Server'
```

## Installing Heroku CLI & push

```sh
$ npm i -g heroku
$ heroku -v
$ heroku login
$ heroku create
$ git remote -v
$ git push heroku master
$ heroku open
```

