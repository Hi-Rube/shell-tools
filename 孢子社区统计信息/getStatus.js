var http = require('http');

function getPercent(i, all){
	var percent = ("" + 100 * (i/all)).substring(0, 4);
	var _zero = "0000";
	if (percent.indexOf('.') == -1){
		return percent + '.' +_zero.substr(0, 3 - percent.length);
	} else {
		return percent +_zero.substr(0, 4 - percent.length);
	}
}

var item = [
	'校园', '亲子',
	'八卦', '杂谈',
	'行者', '娱乐',
	'dancer', '摄影',
	'逗比', '1024', 
	'运动', '碎碎念',
	'吃货', '文青',
	'游戏', '剁手党',
	'虐狗', '萌宠',
	'少女', '其他',
	'科普', '纯爱'
];

var partyList = [];
var nameStore = {};
var nameStoreSize = 0;
var itemCount = item.length;
for (var i = 0; i < item.length; i++){
	 
	console.log('( ' + getPercent(i + 1, itemCount) + '% ) ' + 'Begining to get ' + item[i] + '\'s data');
	
	var group = http.get('http://i.baoz.cn/rest/object/get.群组管理.club_~' + item[i]);

	var party = group.body.readAll().toString();
	var party = JSON.parse(party.substring(7, party.length - 2));

	partyList = partyList.concat(party.groupman.list);
}

var statArr = [];
var partyListCount = partyList.length;

for (var i = 0; i < partyList.length; i++){
	
	var _name = partyList[i].data.group.name;
	if (nameStore[_name]){
		continue;
	} else {
		nameStore[_name] = true;
		nameStoreSize ++;
	}

	console.log('( ' + getPercent(i + 1, partyListCount) + '% ) ' + 'Begining to count ' + _name);
	
	var _stat = http.get('http://i.baoz.cn/rest/object/get.'+ _name +'.groupstat');
	_stat = _stat.body.readAll().toString();
	_stat = JSON.parse(_stat.substring(7, _stat.length - 2));
	var _statList = _stat.groupstat.data;
	statArr.push(_statList);
}

var sum = 0;
var sum_post = 0;
var sum_reply = 0;
var sum_uv = 0;
for (var i = 0; i < statArr.length; i++){
	if (statArr[i].length){
		var stat = statArr[i][statArr[i].length - 1];
		sum_uv += stat['group-uv'];
		sum += stat['group-pv'];
		sum_post += stat['group-post-pv'];
		sum_reply += stat['group-reply-pv'];
	}
}

console.log('party sum : ' + nameStoreSize);
console.log('pv sum : ' + sum);
console.log('uv sum : ' + sum_uv);
console.log('post sum : ' + sum_post);
console.log('reply sum : ' + sum_reply);


