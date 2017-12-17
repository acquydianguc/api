'use strict'

const qs = require('querystring')
const url = require('url')
var base64_encode = require('base64url').encode;
var getUrlSV = require('./getUrlSV.js')

module.exports = (html,cookie) => {
  if (html === null) return({'error' : "Url không hợp lệ"})
  const query = qs.parse(html)
  if (query.status !== 'ok'){
      return ({'error' : "Url drive đang xử lí hoặc không xem được"})
  }else{
      return query.fmt_stream_map
        .split(',')
        .map(itagAndUrl => {
          const [itag, url] = itagAndUrl.split('|')
          return {
            getVideoResolution(itag) + 'p'
            : toRedirectorURL(url,cookie),
          }
        })
        .filter(video => video.res !== 0)
  }
  
}

const getVideoResolution = (itag) => {
  const videoCode = {
    '18': 360,
    '59': 480,
    '22': 720,
    '37': 1080
  }
  return videoCode[itag] || 0
}
const toRedirectorURL = (url,cookie) => {
  cookie = cookie.toString()
  var urlCookie = "&tdD0xNTEzNDg1ND="+base64_encode(cookie) 
  var hash = base64_encode(url)
  return `${getUrlSV()}/videoplayback?I1bHJ4dX=`+ hash + urlCookie
}


var convertOuoUrl = (url,cb) => {
    
  
  var keyOuo = config.keyOuo
  request.get(`http://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`,(err,resq,urlTiny) =>{
    // request.get(`http://ouo.io/api/${keyOuo}?s=${encodeURIComponent(urlTiny)}`,(err,resq,urlOuo) => {
    //  resolve (urlOuo)
    // })
  cb(urlTiny)
  })
}
