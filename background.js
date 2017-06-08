var warningId = 'notification.warning';
var alertMessage;

// function hideWarning(done) {
//     chrome.notifications.clear(warningId, function () {
//         if (done) done();
//     });
// }
//
// function showWarning() {
//     hideWarning(function () {
//         chrome.notifications.create(warningId, {
//             title: 'Page Blocker',
//             type: 'basic',
//             message: '滚去工作啊！！',
//             buttons: [{title: 'Learn More'}],
//             isClickable: true,
//             priority: 2,
//         }, function () {
//         });
//     });
// }

function doBlock(url, callback) {
    chrome.storage.local.get('blackList', function (items) {
        var blackList = items.blackList;
        if (blackList != null) {
            for (index in blackList) {
                var blackUrl = blackList[index].split(":")[0];
                alertMessage = blackList[index].split(":")[1];
                if (url.indexOf(blackUrl) > -1) {
                    if (!time_range('12:30', '14:00') && !time_range('19:20', '23:59') && !time_range('00:00', '09:30')) {
                        callback();
                        return;
                    }
                }
            }
        } else {
            callback();
        }
    })
}

function execute(tabId, url) {
    chrome.tabs.remove(tabId, function () {
        chrome.storage.local.get('alertText', function (items) {
            if (alertMessage != null) {
                alert(alertMessage)
            } else if (items.alertText != null) {
                alert(items.alertText)
            } else {
                alert("滚去工作啊！！！")
            }
        })
    })
}

function time_range(beginTime, endTime) {
    var strb = beginTime.split(":");
    if (strb.length != 2) {
        return false;
    }

    var stre = endTime.split(":");
    if (stre.length != 2) {
        return false;
    }

    var b = new Date();
    var e = new Date();
    var n = new Date();

    b.setHours(strb[0]);
    b.setMinutes(strb[1]);
    e.setHours(stre[0]);
    e.setMinutes(stre[1]);

    if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
        return true;
    } else {
        return false;
    }
}

chrome.storage.local.get({"enable": true}, function (items) {
    chrome.browserAction.setIcon({path: "icon-" + items.enable + ".png"});
});

chrome.tabs.onCreated.addListener(function (tab) {
    chrome.storage.local.get({"enable": true}, function (items) {
        if (!item.enable) return;
        doBlock(tab.url, function () {
            execute(tab.id, tab.url);
        });
    });
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    chrome.storage.local.get({"enable": true}, function (items) {
        if (!items.enable) return;
        doBlock(tab.url, function () {
            execute(tab.id, tab.url);
        });
    });
});