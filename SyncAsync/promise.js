const promise = new Promise((resolve, reject)=>{
  const number = Math.floor(Math.random() * 100);
  // async 한 작업중....
  if(number % 2  === 1) resolve({ id: 1, email: 'neo@hphk.kr'});
  else reject(new Error('Error...ㅠㅠ'));
});

promise
  .then(user => console.log(user.email))
  .catch(error => console.error(error));
