console.log("this is loaded");

var twitterKeys = {
  consumer_key: 'E56Qj4S4MrldHNwoaPZ1wdfxQ',
  consumer_secret: 'wKF6tKPxzuZQLkJqDEmMPRRD1wKwiMzV4HrpkmRTxgC3oAT0lU',
  access_token_key: '924718374378266624-hjBmtm8OwwwAERzJfZeVWBWQKcozYQv',
  access_token_secret: 'SsPnTlGrjAccA2rXVfg8KzxH4HJtgi6w7VTEM1bEu86oA',
};

module.exports = twitterKeys;

var Twitter = require('twitter');



var fs = require("fs");
fs.readFile("./best_things_ever.txt", "utf8", function(error,data){
  if(error){
    console.log(error);
  }
  console.log("we found no error")
});
