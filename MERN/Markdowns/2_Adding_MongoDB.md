# Adding MongoDB

## Server Structure Refactor

* `server/`
  * `config/` : API keys and settings 
  * `routes/` : 목적에 따라 그루빙 된 라우트 핸들러들
  * `services/` : 헬퍼 모듈들과 비즈니스 로직
  * `index.js` : Main File

```sh
$ pwd
/.../.../MERN/server
$ mkdir routes
$ touch routes/auth.js
$ mkdir services
$ touch services/passport.js
```

`routes/auth.js`

```js
const passport = require('passport');
const router = require('express').Router();

router.get(
  "/",
  passport.authenticate(
    "google",
    { scope: ["profile", "email"] },

  )
);

router.get(
  '/callback',
  passport.authenticate('google')
);

module.exports = router;
```

`services/passport.js`

```js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile', profile);
      console.log('done', done);
    }
  )
);

```

`index.js`

```js
require('./services/passport');
const auth = require('./routes/auth');
const express = require("express"); // nodeJS 는 commonjs require 만 사용가능.
const app = express();

app.use('/auth/google', auth);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

```



## The Theory of Authentication

 HTTP request 는 stateless 하다. 상태가 없기에 로그인 해 있는 상태 라는 것이 없다. 때문에 쿠키(세션) 을 사용한다.

우리는 Cookie based authentication 을 사용할 것이다.

사용자가 OAuth 를 사용하면, 브라우저에게 보내주는 header 에 set-cookie 라는 명령어를 사용해 브라우저 메모리에 쿠키를 함께 보낼 것이고, 이후로 해당 브라우저에서 보내는 req 에서는 쿠키를 포함해서 요청을 보낼 것이다. 그럼 우리 서버는 쿠키를 분석해 해당 사용자가 인증받은 사용자라는 것을 확인하여 '로그인' 이라느 상태를 구현하는 것이다.

쿠키 이외에도 여러 방식(JWT 라던가)이 있지만 우리는 우선 쿠키를 사용할 것이다.

## Singing in Users with OAuth

일반적인 이메일 - 비밀번호 가입 - 로그인 과 OAuth 방식의 로그인 의 작동 방식 차이를 알아보자.

* 이메일 - 비밀번호
  * 사용자가 회원가입을 한다.
  * 이메일 - 비밀번호를 입력한다.
  * DB 에 이메일 - 비밀번호를 저장한다.
  * 사용자가 로그인 을 한다.
  * 이메일 - 비밀번호를 입력한다.
  * DB 의 이메일 - 비밀번호와 입력받은 이메일 - 비밀번호를 비교한다.
  * 매치되는 레코드가 있다면, 로그인 시킨다.
* OAuth
  * 사용자가 구글계정으로 로그인을 한다.
  * 구글에서 사용자 정보를 받는다.
  * **DB 에 사용자 정보조각이 있는지 확인한다.**
  * 없다면, 사용자 정보중에 영구적인 정보 조각을 저장한다.
    * email..? 구글은 보조 이메일 추가가 가능하다. 이때 서로 다른 이메일로 인식하게 되기보다는
    * id! 계정 고유의 아이디를 저장하는것이 더 확실하다. (id 가 바뀌면..? 망함. 구글을 믿는것)
  * 사용자가 로그아웃 한다.
  * 다시 로그인 한다.
  * 구글에서 사용자 정보를 받는다. (완전히 같은 흐름)
  * **DB 에 사용자 정보조각이 있는지 확인한다.**
  * 있다면, 해당 정보와 매칭되는 사용자로 로그인!

## Introduction To MongoDB

이전 express 파트 참고

## MongoDB Setup

이전 express 파트 참고

MLAB

가입 => AWS-Sandbox => name-dev(ex: mern-dev) => 생성 => 대시보드 

Users 는 DB 사용자(우리)를 의미한다.

users => Add user => name/pw

## Connection Mongoose to Mongo

```sh
$ pwd
/.../.../MERN/server
$ npm i mongoose
```

`config/keys.js`

```js
module.exports = {
  googleClientID: '1040806080298-ouq493as4khtsr79tmfe3iqng9q22sq7.apps.googleusercontent.com',
  googleClientSecret: 'jviVfiqcb2cgL2-AF1Bnr_a0',
  mongoURI: 'mongodb://<dbuser>:<dbpassword>@ds229450.mlab.com:29450/mern'
};
```

`index.js`

```js
const auth = require('./routes/auth');
const keys = require('./config/keys');

const mongoose = require('mongoose');
const express = require("express");
const app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error(error.message));

app.use('/auth/google', auth);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

```

## Mongoose Model Classes

```sh
$ pwd
/.../.../MERN/server
$ mkdir models
$ touch models/User.js
```

`models/User.js`

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('user', userSchema);

exports.User = User;
```

## Saving Model Instances

`services/passport.js`

```js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require('mongoose');
const keys = require("../config/keys");
const { User } = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      new User({ googleID: profile.id }).save();
    }
  )
);

```

## Mongoose Quereis

이제 이미 ID 가 있으면, 저장하지 않도록 하는 로직을 만들자.

`services/passport.js`

```js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require('mongoose');
const keys = require("../config/keys");
const { User } = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      let user = User.findOne({ googleID: profile.id })
        .then(existingUser => {
          if (existingUser) { // User exists
            done(null, existingUser);
          } else { // no such user
            new User({ googleID: profile.id })
              .save()
              .then(newUser => done(null, newUser))
              .catch(error => done(error))
          }
        })
        .catch(error => {
          done(error);
        })
    }
  )
);

```

## Passport Callbacks

`done()` 이 아마 헷갈릴 것이다. 일단 기본적으로는 passport strategy 를 사용하면, 크게 3가지 경우가 있을 것이다.

1. 성공
2. 실패
3. 에러

이때, `done` 은 미들웨어에서 `next` 를 생각하면 되는데, 이때 첫번째 인자로는 에러 관련된 내용을 넘기고, 두번째 인자로는 우리가 사용자에게 넘기고 싶은 응답을 보내면 된다. 가령 `catch(err) { done(error) }` 와 같은 코드 작성이 가능한것이다. `done(null, false)` 는 에러는 없지만 실패를 의미하고, `done(null, user)` 는 성공을 의미하겠지?

## Encoding(Serialize) - Decoding Users

이제 우리가 찾은 사용자 정보를 encode 하여 토큰으로 만들어 브라우저로 실어 보내야 된다.

이후에 클라이언트에서 요청을 보낼때, 쿠키에 실려온 토큰을  decode 하여 존재하는 사용자라는 사실을 알아야 한다.

`services/passport.js`

```js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require('mongoose');
const keys = require("../config/keys");
const { User } = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      let user = User.findOne({ googleID: profile.id })
        .then(existingUser => {
          if (existingUser) { // User exists
            done(null, existingUser);
          } else { // no such user
            new User({ googleID: profile.id })
              .save()
              .then(newUser => done(null, newUser))
              .catch(error => done(error))
          }
        })
        .catch(error => {
          done(error);
        })
    }
  )
);

```



`serialzieUser()` 에서 `usre.id` 는 Google ID 가 아닌 DB 에 저장된 도큐먼트 ID를 의미한다. 자동으로 이 ID 를 ref 한다. 이 ID를 사용하는 이유는, 다른 OAuth 를 사용할 경우, 해당 서비스에서 제공하는 ID 가 없을 수도 있기 때문이다. 하지만 DB 에 저장될때 `_id` 는 무조건 생성되므로 다른 케이스 생각하지 않아도 된다. `null` 은 에러



## Enabling Cookies

기본적으로 Express 는 쿠키/세션을 모른다. 

```sh
$ npm i cookie-session
```

`config/keys.js`

```js
module.exports = {
  googleClientID: '1040806080298-ouq493as4khtsr79tmfe3iqng9q22sq7.apps.googleusercontent.com',
  googleClientSecret: 'jviVfiqcb2cgL2-AF1Bnr_a0',
  mongoURI: 'mongodb://neo:password123@ds229450.mlab.com:29450/mern',
  cookieKey: 'whatarandomstringtouse'
};
```

`index.js`

```js
require('./services/passport');

const User = require('./models/User');

const auth = require('./routes/auth');

const keys = require('./config/keys');

const cookieSession = require('cookie-session'); // 추가
const passport = require('passport'); // 추가
const mongoose = require('mongoose');
const express = require("express");
const app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error(error.message));

app.use(
  cookieSession({
    name: 'MERN cookie',
    maxAge: (30 * 24 * 60 * 60 * 1000),// 30일 millie seconds
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth/google', auth);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

```

`keys: [keys.cookieKey]` 

The list of keys to use to sign & verify cookie values, or a configured
[`Keygrip`](https://www.npmjs.com/package/keygrip) instance. Set cookies are always
signed with `keys[0]`, while the other keys are valid for verification, allowing
for key rotation. If a `Keygrip` instance is provided, it can be used to
change signature parameters like the algorithm of the signature.

## Testing Auth

Flow

1. (어떤 종류던) 요청 들어옴
2. `cookieSession()` 미들웨어 함수가 쿠키 데이터를 세팅/추출 (`req.session` == user.id)
3. `passport.initialize()` 미들웨어 => 인증 모듈 초기화
4. `passport.session()` => `req` object 에서 `user` 라는 키에 현재 cookie 에서 추출한 `user.googleID` deserialize 하여  할당(`req.user: <User instance>`) (2)

확인해보자.

```sh
$ pwd 
/.../.../MERN/server
$ touch routes/users.js
```

`routes/users/js`

```js
const router = require('express').Router();

router.get('/current', (req, res) => {
  res.send(req.user);
});

module.exports = router;
```

`index.js`

```js
require('./services/passport');

const User = require('./models/User');

const auth = require('./routes/auth');
const users = require('./routes/users'); // 추가

const keys = require('./config/keys');

const cookieSession = require('cookie-session');
const passport = require('passport'); 
const mongoose = require('mongoose');
const express = require("express");
const app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error(error.message));

app.use(
  cookieSession({
    name: 'MERN cookie',
    maxAge: (30 * 24 * 60 * 60 * 1000),
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth/google', auth);
app.use('/api/users', users); // 추가

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


```

`http://localhost:5000/api/users/current`

## Logging Out Users

`routes/users.js`

```js
const router = require('express').Router();

router.get('/logout', (req, res) => {
  req.logout();
  res.send({
    message: 'You signed out successfully',
    user: req.user
  })
});

router.get('/current', (req, res) => {
  res.send(req.user);
  // res.send(req.session)
});


module.exports = router;
```

`/api/users/logout` => `/api/users/current`

`req.logout()` 은 Passport 가 자동으로 생성해준 로그아웃(쿠키 삭제) 함수다.

## A deeper Dive

### Middleware

이전 express 파트 참고

### `cookieSession`

`req.session` 에 db `user.id` 를 잡고, passport 는 이 id 를 통해 `req.user` 를 세팅

`cookie.session` vs `express-session`

1. cookie-session 은 정말로 쿠키에 serialize 된 정보를 담음(`user.id`) (cookie is session)
2. express-session 은 세션 id 를 담고, 서버에서 해당 id 를 기반으로 정보를 찾음
   1. `session_id = 1`
   2. MongoDB
      1. `{ id: 1, name: 'neo' }`
      2. `{ id: 2, name: 'john' }`

차이는?

* express-session 은 DB 를 사용하므로, 원하는 데이터를 모두 용량에 상관없이 담을 수 있음
  * 추가 세팅(고통) - express-session 도큐먼트 참조
* cookie-session 은 cookie 에 담을 수 있는 정보양이 한정되어 있음(4kb)
  * 지금같은 경우에는 큰 정보를 사용하지 않기 때문에 이게 더 경제적

### 실제 auth flow

네트워크 탭에서 

logout => login => current 를 보면 set-cookie 에 내용이 바뀌거나 없다. 암호화 되어 있긴 하지만, 길이가 다른건 정보 양이 더 많기 때문. current 에서는 우리가 쿠키를 보내긴 하지만 서버에서 바꿀 내용이 없어서 set-cookie 가 없다. 대신 req header 에는 자동으로 cookie 가 있다. 그리고 logout 에서도 set-cookie 가 있지만, 실제로 해독해보면 비어있다는 뜻이 될 것이다.