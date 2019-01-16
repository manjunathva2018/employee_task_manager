//import randomatic module
var randomize = require('randomatic');

module.exports.otpGenerator=function(){
  let random = randomize('0', 6);
  return random;
}