var dateFormat = function (date) {

	var curTime = +new Date(); 
	var suffix = "前";

	var minutes = (curTime - date) / (60 * 1000);
	var hours = (curTime - date) / (60 * 60 * 1000);
	var days = Math.floor(hours / 24);

	if (minutes < 60) {
		return parseInt(minutes) + "分钟" + suffix;
	} else if (hours < 24) {
		return parseInt(hours) + "小时" + suffix;
	} else if (days >= 1 && days <= 7) {
		return days + "天" + suffix;
	} else if (days > 7) {
		return "一周" + suffix;
	}	
}

var oddOrEvenRow = function (number) {
	return number % 2 == 0? "even": "odd";
}

module.exports = {
	dateFormat: dateFormat,
	isOdd: oddOrEvenRow
}