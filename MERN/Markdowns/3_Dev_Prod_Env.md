# Dev vs Prod Env

## Dev vs Prod keys

dev 에서 사용할 키 세트와 prod 에서 사용할 키 세트를 분리해야 한다.

prod 키는 헤로쿠 서버에 저장하고 dev 키는 우리 머신에 저장하자. 이렇게 하면 우리 머신이 사라져도 실제 배포중인 서버에서 문제가 생기지 않는다. 

또한 DB 를 개발-배포 분리해야 하는데, 우리 배포 db 에는 테스트 케이스가 아닌 완전히 클린한 실제 사용자 데이터만 들어있어야 한다. 반면 개발 db 에는 우리가 원하는대로 데이터를 넣고 지우고 해도 된다. 잘못되도 문제가 없다! 같은일을 두번해서 싫겠지만, 해야만 한다. API 키도 두개, DB 도 두개!

## Genrate Production Resources

정-말로 안전하게 하고싶다면 mlab 과 google 계정도 새로 생성해야 하지만, 그건 선택..

mlab => new DB => name-prod (ex: mern-prod) => User => Secure username & password

google api 새프로젝트 => name-prod(ex: mern-prod) => app 변경 => api 및 서비스 추가(google+ api) => 사용자 인증 정보추가

* 2 OAuth 2.0 클라이언트 ID 만들기
  * 승인된 자바스크립트 원본
    * `$ heroku open` => url 사용
  * 승인된 리디렉션 URI
    * `<URL_ABOVE>/auth/google/callback`
* OAuth 2.0 동의 화면 설정
  * 열심히
* dd

```sh
$ npm i config
$ touch config/default.json
$ touch config/development.json
$ touch config/production.json
$ touch config/custom-environment-variables.json
$ echo 'config/development.json' >> .gitignore
```

`config/default.json`

```json
{
  "name": "MERNeo"
}
```

`config/development.json`

```json
{
  "name": "MERNeo-DEV",
  "DB": {
    "mongoURI": "<DEV_MLAB_URI>"
  },
  "google": {
    "ClientID": "<DEV_GOOGLE_API_CLIENT_ID>",
    "ClientSecret": "<DEV_GOOGLE_API_CLIENT_SECRET>
  },
  "cookie-key": "whateverstringthatienter"
}
```

`config/production.json`

```json
{
  "name": "MERNeo-PROD"
}
```

`config/custom-environment-variables.json`

```json
{
  "DB": {
    "mongoURI": "MONGO_URI"
  },
  "auth": {
    "google": {
      "clientID": "GOOGLE_CLIENT_ID",
      "clientSecret": "GOOGLE_CLIENT_SECRET"
    }
  },
  "cookie-key": "COOKIE_KEY"
}
```

Heroku => Settings => Reveal config vars

`services/passport.js`

```js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const mongoose = require("mongoose");
const { User } = require("../models/User");
const config = require('config'); // 추가

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.auth.google.clientID, // 수정
      clientSecret: config.auth.google.clientSecret, // 수정
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      let user = User.findOne({ googleID: profile.id })
        .then(existingUser => {
          if (existingUser) {
            // User exists
            done(null, existingUser);
          } else {
            // no such user
            new User({ googleID: profile.id })
              .save()
              .then(newUser => done(null, newUser))
              .catch(error => done(error));
          }
        })
        .catch(error => {
          done(error);
        });
    }
  )
);

```

`index.js`

```js
require('./services/passport');

const User = require('./models/User');

const auth = require('./routes/auth');
const users = require('./routes/users');


const config = require('config'); // 추가
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');
const express = require("express");
const app = express();

// 수정
mongoose.connect(config.DB.mongoURI, { useNewUrlParser: true }
  .then(() => console.log(`Connected to MongoDB in ${app.get('env')}`)) // 수정
  .catch((error) => console.error(error.message));

app.use(
  cookieSession({
    name: 'MERN cookie',
    maxAge: (30 * 24 * 60 * 60 * 1000),
    keys: [config.cookieKey] // 수정
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth/google', auth);
app.use('/api/users', users);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

```

Login 에서 google error 가 난다. http / https 문제다

## Heroku proxy issues

사용할 수 있는 방법

1. `services/passport.js`

   ```js
   ...
   passport.use(
     new GoogleStrategy(
       {
         clientID: config.auth.google.clientID,
         clientSecret: config.auth.google.clientSecret, 
         callbackURL: "/auth/google/callback" // 상대 url 에서 문제 자동으로 처리하지 않는다. 하드코딩하면 되긴 한다. but..
       },
       (accessToken, refreshToken, profile, done) => {
         let user = User.findOne({ googleID: profile.id })
           .then(existingUser => {
             if (existingUser) {
               // User exists
               done(null, existingUser);
             } else {
               // no such user
               new User({ googleID: profile.id })
                 .save()
                 .then(newUser => done(null, newUser))
                 .catch(error => done(error));
             }
           })
           .catch(error => {
             done(error);
           });
       }
     )
   );
   ...
   ```

   1. 현재 heroku 는 aws 위의 가상 서버다. 헤로쿠가 프록시를 사용하여 요청을 처리중인데, `GoogleStrategy` 가 한번이라도 프록시 서버를 거치면, 요청이 https 가 아니라고 처리한다. 즉 프록시를 거치면서 안전하지 않은 요청이 되어있을것이라 생각한다!

2. `services/passport.js`

   ```js
   ...
   passport.use(
     new GoogleStrategy(
       {
         clientID: config.auth.google.clientID,
         clientSecret: config.auth.google.clientSecret, 
         callbackURL: "/auth/google/callback",
         proxy: true // Good
       },
       (accessToken, refreshToken, profile, done) => {
         let user = User.findOne({ googleID: profile.id })
           .then(existingUser => {
             if (existingUser) {
               // User exists
               done(null, existingUser);
             } else {
               // no such user
               new User({ googleID: profile.id })
                 .save()
                 .then(newUser => done(null, newUser))
                 .catch(error => done(error));
             }
           })
           .catch(error => {
             done(error);
           });
       }
     )
   );
   ...
   ```
