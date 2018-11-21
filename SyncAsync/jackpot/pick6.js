const _ = require('underscore');
const numbers = _.range(1, 46);

module.exports = _.sample(numbers, 6).sort();