/* ES5 */
function makeRequest(url, method){
    if(!method){
        method = 'GET';
    }
    doSomeThing(method, url);
}

makeRequest('http://hphk.io');
makeRequest('http://hphk.io', 'GET');
makeRequest('http://hphk.io', 'POST');

/* ES6 */
function makeRequest2 (method='GET', url){
    doSomeThing(method, url);
}

/* 실습 */
function sum(a, b){
    if(a === undefined){
        a = 0;
    }
    if(b === undefined){
        b = 0;
    }
    return a+b;
}
/* refactoring */
const sum = (a=0, b=0) => a+b;


/* 실습 */
function addOffset(style){
    if(!style){
        style = {};
    }
    style.offset = '10px';
    return style;
}