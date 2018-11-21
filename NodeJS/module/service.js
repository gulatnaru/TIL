
// const fs = require('fs')
// const express = require('express');
const sum = require('./utility');
// const routes = require('./routes')
// const dbconfig = require('./configs/database.json');

const total = sum([100, 200, 300]);

console.log(total);
console.log(sum([1,2,3]));