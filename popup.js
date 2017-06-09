/**
 * Created by bestv on 2017/5/27.
 */
var storage = chrome.storage.local;

storage.get("enable", function (items) {
    $('#on-off').prop('checked', items.enable);
});
storage.get("alertText", function (items) {
    $('#alert-text').val(items.alertText);
});
storage.get('temporaryBlackList', function (items) {
    $('#temporary-black-list').val(items.temporaryBlackList.join('\n'));
});
storage.get('permanentBlackList', function (items) {
    $('#permanent-black-list').val(items.permanentBlackList.join('\n'));
});

$(function () {
    $('#on-off').click(function () {
        var enable = $('#on-off').prop("checked");
        chrome.browserAction.setIcon({path:"icon-" + enable + ".png"});
        storage.set({'enable':enable}, function () {});
    })

    $('#alert-text').change(function () {
        storage.set({'alertText': $('#alert-text').val()}, function () {});
    });

    $('#temporary-black-list').change(function () {
        var temporaryBlackListString = $('#temporary-black-list').val();
        var temporaryBlackList = temporaryBlackListString.split('\n')
        storage.set({'temporaryBlackList':temporaryBlackList}, function () {})
    });

    $('#permanent-black-list').change(function () {
        var permanentBlackListString = $('#permanent-black-list').val();
        var permanentBlackList = permanentBlackListString.split('\n')
        storage.set({'permanentBlackList':permanentBlackList}, function () {})
    });
});