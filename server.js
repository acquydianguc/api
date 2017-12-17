var express = require('express')
var base64 = require('base64url');
var request = require('request')
var getLinkGoogleDrive = require('./lib/getLinkGoogleDrive')
var extrachFileId = require('./lib/extrachFileId')
var config = require('./lib/config')
var app = express()

app.get('/b29nbGUuY29tL3ZpZGVvcGxheWJhY2s_aWQ9N/drive',(req,res) => {
	var url = req.query.url
	var docId = extrachFileId(url)
	if(url && docId){
		getLinkGoogleDrive(docId,(data) => {
			res.json(data)
		})
	}else{
		res.json({
			error : "url khong dung dang"
		})
	}
})

const PORT = config.port


app.listen(PORT,() => {
	console.log(`app listen port ${PORT}`)
})
