/*global chrome*/
async function sendMessage(from, s2e) {
    chrome.runtime.sendMessage({ from, message: s2e  })
}

async function receiveMessage(callback) {
    chrome.runtime.onMessage.addListener(
        function (message, sender, sendResponse) {
            console.log(`${JSON.stringify(sender)} ${JSON.stringify(message)}`);
            callback(message, sender)
        }
    );
}

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

async function busyWait(fn) {
    let counter = 0;
    let el;
    const sleep = () => new Promise(resolve => setTimeout(resolve, 500))
    do {
        await sleep()
        el = fn()
    } while (!el && ++counter < 75)

    return el
}