const promise = new Promise((resolve, reject) => {
    const number = Math.floor(Math.random() * 100);
    //async한 작업중...
    if(number % 2 === 1) resolve({ id: 1, email: 'gulatnaru1@naver.com'})//성공
    else reject(new Error('Error ...')); //실패
});

promise
    .then( user => console.log(user.email) )
    .catch( error => console.log(error.message) );

