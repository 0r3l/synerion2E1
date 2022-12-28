(function iife() {
    const element = `<div id="s2e" class="control-panel-widgets-regoin">
                    <div class="control-panel-widget-title">
                        <div class="control-panel-widget-main-title">
                            חישוב שעות החודש
                        </div>
                    </div>
                </div>`

    docReady(async function () {
        if (!document.getElementById('s2e')) {
            const container = document.getElementsByClassName('main-content')[0]
            if (container) {
                container.innerHTML += element
            }


            const res = await getAttendance()
            console.log((res))
        }
    })

})()


async function getAttendance() {

    const currentYear = new Date().getYear()
    const currentMonth = new Date().getMonth() + 1
    const daysInMonth = new Date(currentYear, currentMonth,0).getDate()

    const res = await fetch("https://att.synerioncloud.com/SynerionWeb/api/DailyBrowser/Attendance", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,he;q=0.8",
            "client-date-time": "2022-12-28T12:00:05.902",
            "content-type": "application/json;charset=UTF-8",
            "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\""
        },
        "referrerPolicy": "no-referrer",
        "body":`{"Employees":null, "SelectionMode":0,"DatePeriodSelection":{"AccumCode":4,"DateRange":{"From":"${currentYear}-${currentMonth}-01T00:00:00.000Z","To":"${currentYear}-${currentMonth}-${daysInMonth}T10:00:03.000Z"},"IsDateRange":false,"PeriodKey":202212},"FirstResult":0,"ItemsOnPage":35,"SortDescriptors":null,"Filters":null,"LoadEmployeeMode":1}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });

    return res.json()
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