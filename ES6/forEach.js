/* ES5 for() */

var colors = ['red', 'blue', 'green'];

for (var i = 0; i<colors.length; i++){
    console.log(colors[i]);
}

/* ES6 forEach() */
colors.forEach(function(color){
    console.log(color);
});

var numbers = [1,2,3,4,5];
var sum = 0;

function add(number){
    sum += number;
};

numbers.forEach(add);


console.log(sum);


/* 실습 1 */

function handlePosts(){
    var posts = [
        { id: 23, title: 'daily js news'},
        { id: 52, title: 'Code Refactor City'},
        { id: 105, title: 'The Brightest Ruby'}
    ];

    posts.forEach((post) => {
        savePost(post);
    });
}

var images = [
    { height: 10, width: 30},
    { height: 20, width: 90},
    { height: 54, width: 32}
];

var areas = [];
images.forEach(function(image){
    areas.push(image.height * image.width);
})

console.log(areas);
