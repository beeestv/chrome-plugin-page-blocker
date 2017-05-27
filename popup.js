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
storage.get('blackList', function (items) {
    $('#black-list').val(items.blackList.join('\n'));
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

    $('#black-list').change(function () {
        var blackListString = $('#black-list').val();
        var blackList = blackListString.split('\n')
        storage.set({'blackList':blackList}, function () {})
    });
});