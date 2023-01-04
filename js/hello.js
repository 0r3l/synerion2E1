$(function () {
    // init feather icons
    feather.replace();

    chrome.tabs.create({
        url: "https://att.synerioncloud.com/SynerionWeb/#/controlPanel"
    })
});