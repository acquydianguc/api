var qs = require('querystring')
var request = require('request')
var rp = require('request-promise');

var extractVideos = require('./extract-videos')
var config = require('./config')

var getLink = (docId,cb) => {
		request.get(`https://docs.google.com/e/get_video_info?docid=${docId}`,
			(err,resq,body) => {
				var datas = extractVideos(body,resq.headers['set-cookie'])
				cb(datas)
				
			})
}

var convertOuoUrl = (url,cb) => {
    rp(`http://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`)
    .then(function (urlTiny) {
        rp(`http://ouo.io/api/${config.keyOuo}?s=${encodeURIComponent(urlTiny)}`)
        .then((urlOuo) => {
            cb(urlOuo)
        })
           .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))

}
module.exports = getLink