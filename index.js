'use strict';
var axios = require('axios');
require('dotenv').config();

var token = process.env.SLACK_TOKEN
var userID = process.env.USER_ID

var count = 100 //Files to delete

axios.defaults.headers.post['Content-Type'] = 'application/json';

var getFiles = function(){
	axios.get(`https://slack.com/api/files.list?token=${token}&user=${userID}&count=${count}&pretty=1`).then((res) => {
	    var data = res.data;
	    processFiles(data.files)
	}).catch((err)=> {
	    console.log('Error', err);
	});
}

var processFiles = function(files){
	console.log(files.length)
	// Uncomment to delete files
	// files.map((file) => (file.size > 15000) ? deleteFiles(file.id) : null )
}

var deleteFiles = function(file){
	axios.post(`https://slack.com/api/files.delete?token=${token}&file=${file}&pretty=1`).then((res) => {
	    console.log(res.data)	    
	}).catch((err)=> {
	    console.log('Error', err);
	});
}





// Start
getFiles();