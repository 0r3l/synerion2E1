document.getElementById("login").addEventListener("click", go);

function go() {
    chrome.tabs.create({
        url: "https://att.synerioncloud.com/SynerionWeb/#/controlPanel"
    })
}