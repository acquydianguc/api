var sv = require('./config').domain
 Array.prototype.random = function (length) {
       return this[Math.floor((Math.random()*length))];
 }


var getUrl = () => {
	return  sv.random(sv.length)
}
module.exports = getUrl