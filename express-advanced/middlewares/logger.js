function log(req, res, next){
  console.log('모든 요청이 올때마다 로그를 남깁니다.٩(ᐛ)و');
  next();
}

module.exports = log;