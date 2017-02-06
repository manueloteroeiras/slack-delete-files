'use strict';
var axios = require('axios');
var prompt = require('prompt');
require('dotenv').config();

prompt.start();

var token = process.env.SLACK_TOKEN
var userID = process.env.USER_ID
var promptInput = {};
var data = [];

axios.defaults.headers.post['Content-Type'] = 'application/json';

console.log("Hi there!")

var getFiles = function(filesCount, list){
	axios.get(`https://slack.com/api/files.list?token=${token}&user=${userID}&count=${filesCount}&pretty=1`).then((res) => {
	    data = res.data;
	    (list) ? console.log("( You have ", data.files.length, " )") : processFiles(data.files);
	}).catch((err)=> {
	    console.log('Error', err);
	});
}

var processFiles = function(files){
	files.map((file) => deleteFiles(file.id) );
}

var deleteFiles = function(file){
	axios.post(`https://slack.com/api/files.delete?token=${token}&file=${file}&pretty=1`).then((res) => {
	    (res.data.ok) ? console.log("√") : console.log("x")
	}).catch((err)=> {
	    console.log('Error', err);
	});
}


getFiles(1000, true);


prompt.get({ name: 'files', description: 'How many files do you want to delete ? ', type: 'string', required: true},
	function (err, result) {
		promptInput = result;
	    getFiles(result.files, false);
});