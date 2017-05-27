/**
 * Created by bestv on 2017/5/27.
 */
var storage = chrome.storage.local;

storage.get("enable", function (items) {
    $('#onoff').prop('checked', items.enable);
});
storage.get("alertText", function (items) {
    $('#alert-text').val(items.alertText);
});
$(function () {
    $('#onoff').click(function () {
        var enable = $('#onoff').prop("checked");
        chrome.browserAction.setIcon({path:"icon-" + enable + ".png"});
        storage.set({'enable':enable}, function () {});
    })

    $('#alert-text').change(function () {
        storage.set({'alertText': $('#alert-text').val()}, function () {});
    });
});