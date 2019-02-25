const axios = require('axios');
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// setting day and arrays
let names = [];
let addresses = [];
let page = 1;
let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let now = new Date();
let today = days[now.getDay()];

console.log("Food Truck API Sample")
console.log("Today is " + today);

axios({
  url: 'https://data.sfgov.org/resource/bbb8-hzi6.json?$order=applicant&&dayofweekstr=' + today + '&&$$app_token=',
  method: 'get'
})
  .then(response => {
  	// passes the data into arrays
  	for(let i = 0; i < response.data.length; ) {
  		names[i] = response.data[i].applicant;
  		addresses[i] = response.data[i].location;
  		i++;
  	}
  	// prints first 10 Food Trucks
    console.log("Here is a list of Food Trucks that are open today...");
    console.log("Name\t\t\t\t\t\t\t\t\t\tAddress");
    for(let i = 0; i < 10 || i < response.data; i++) {
    	console.log(names[i] + "\t\t\t\t\t\t\t\t" + addresses[i]);
    }
    console.log("\n\t\t\t\t\t\t\t\t\t\tEnter = Next");
    console.log("\t\t\t\t\t\t\t\t\t\tPage: " + page + "\n\n");
    page++;
  })
  .catch(error => {
    console.log(error);
  });

// listens to keypress
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else if (key.name === 'return') {
  	// if the user presses "return", the next 10 Food Trucks will be printed
  	if(page < (names.length / 10) + 1) {
	    console.log("These are the next 10 Trucks...");
	    console.log("Name\t\t\t\t\t\t\t\t\t\tAddress");
	    for(let i = (page - 1) * 10; i < ((page-1) * 10) + 10 && i < names.length; i++) {
	    	console.log(names[i] + "\t\t\t\t\t\t\t\t" + addresses[i]);
	    }
	    console.log("\n\t\t\t\t\t\t\t\t\t\tEnter = Next");
    	console.log("\t\t\t\t\t\t\t\t\t\tPage: " + page + "\n\n");
	    page++;
	} else {
		console.log("There are no more results, press cntrl+c to quit");
	}
  }
});