var enable;
var blackList=[
	'weibo', 
	'v2ex', 
	'qzone',
	'tieba.baidu.com'
	];
	
chrome.storage.local.get({"enable":true}, function(items){
	enable = items.enable;
	chrome.browserAction.setIcon({path:"icon-" + enable + ".png"});
});
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.storage.local.set({"enable":!enable},function(){
		enable = !enable;
		chrome.browserAction.setIcon({path:"icon-" + enable + ".png"});
	});
});

chrome.tabs.onCreated.addListener(function(tab) {
	if (!enable) return;
	if (doBlock(tab.url)) {
		execute(tab.id, tab.url);
	}
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (!enable) return;
	if (doBlock(tab.url)) {
		execute(tabId, tab.url);
	}
});

function doBlock(url) {
	for (index in blackList) {
		if (url.indexOf(blackList[index])>-1) {
			if (time_range('12:30', '14:00') || time_range('19:20', '23:59')) {
				alert('工作之余');
				return false;
			}
			return true;	
		}
	}
	return false;
}

function execute(tabId, url) {
	chrome.tabs.remove(tabId, function(){
		alert('滚去工作啊！！');
	});
}

function time_range(beginTime, endTime) {
    var strb = beginTime.split (":");
    if (strb.length != 2) {
        return false;
    }

    var stre = endTime.split (":");
    if (stre.length != 2) {
        return false;
    }

    var b = new Date ();
    var e = new Date ();
    var n = new Date ();

    b.setHours (strb[0]);
    b.setMinutes (strb[1]);
    e.setHours (stre[0]);
    e.setMinutes (stre[1]);

    if (n.getTime () - b.getTime () > 0 && n.getTime () - e.getTime () < 0) {
        return true;
    } else {
        return false;
    }
}