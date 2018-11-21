function authenticator(req, res, next) {
  console.log('사용자 인증을 진행중입니다.(•̀ᴗ•́)و')
  next();
}

module.exports = authenticator;