/* ES5 */
// var name = '양흥영';
// var title = 'Junior software developer';
// var workHour = '9 am to 6 pm';

function count (targetString) {
    var characters = ['a', 'e', 'i', 'o', 'u'];
    var number = 0;

    for (var i = 0; i<targetString.length; i++){
        if(characters.includes(targetString[i])){
            number++;
        }
    }
    return number;
}

/* ES6 */
const name = '양흥영';
let title = 'Junior software developer';
let workHour = '9 am to 6 pm';

function count (targetString) {
    const characters = ['a', 'e', 'i', 'o', 'u'];
    let number = targetString.split('').reduce(function(acc, char){
        if(characters.includes(char)){
            acc++;
        }
        return acc;
    }, 0)

    return number;
}

console.log(count('asdfqeqweqiuo'));