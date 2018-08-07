const moment = require('moment');

// var date = moment();
// date.add(1,'year').subtract(1,'months');
// console.log(date.format('D MMM YYYY'));


var CreatedAt = 1234;
var date = moment(CreatedAt);
console.log(date.format('h:mm a'));
