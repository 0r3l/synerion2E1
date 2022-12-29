
(function iife() {

    const script = document.createElement('script');
    script.src = chrome.runtime.getURL("config.js");
    (document.body || document.head || document.documentElement).appendChild(script);


    const showStats = (dateStr, tnw) => `<div id="s2e" class="control-panel-widgets-regoin">
                    <div class="control-panel-widget-title">
                        <div class="control-panel-widget-main-title">
                            Enterprise 1 stat for: ${dateStr}
                        </div>
                        <div>Time Not Worked: ${tnw}</div>         
                        <div>Feed to E1: <a href="https://att.pvcloud.com/planview/ResourceAssignmentManager/ResourceManager.aspx?ptab=RES_MGR&pt=RESOURCE&sc=632369">go</a></div>               
                    </div>
                </div>`

    docReady(async function () {
        if (!document.getElementById('s2e')) {
            const container = document.getElementsByClassName('main-content')[0]
            if (container) {

                const currentYear = new Date().getFullYear()
                const currentMonth = new Date().getMonth() + 1

                const attendance = await getAttendance(currentYear, currentMonth)
                const codes = await getStatusCodes()
                const mapped = attendance.DailyBrowserDtos.flatMap(a => a.InOuts.map(io => {

                    const { Id, Description } = codes.find(c => io.ReportingCode.Code === c.Id)
                    const { InOuts } = a
                    return {
                        Id,
                        Description,
                        ...InOuts
                    }
                }))

                const dict = timeNotWorked.reduce((acc, curr) => typeof curr === 'object' ? ({ ...curr, ...acc }) : ({ [curr]: 8, ...acc }), {})

                const sum = mapped
                    .filter(m => dict[m.Id.toString()] > 0)
                    .map(m => dict[m.Id.toString()])
                    .reduce((acc, curr) => acc + curr)                        

                container.innerHTML += showStats(`${currentMonth}/${currentYear}`, sum)
            }



        }
    })

})()


async function getAttendance(currentYear, currentMonth) {
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate()

    const res = await fetch("https://att.synerioncloud.com/SynerionWeb/api/DailyBrowser/Attendance", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,he;q=0.8",
            "client-date-time": "2022-12-28T12:00:05.902",
            "content-type": "application/json;charset=UTF-8",
            "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\""
        },
        "referrerPolicy": "no-referrer",
        "body": `{"Employees":null, "SelectionMode":0,"DatePeriodSelection":{"AccumCode":4,"DateRange":{"From":"${currentYear}-${currentMonth}-01T00:00:00.000Z","To":"${currentYear}-${currentMonth}-${daysInMonth}T10:00:03.000Z"},"IsDateRange":false,"PeriodKey":202212},"FirstResult":0,"ItemsOnPage":35,"SortDescriptors":null,"Filters":null,"LoadEmployeeMode":1}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });

    return res.json()
}

async function getStatusCodes() {
    const res = await fetch("https://att.synerioncloud.com/SynerionWeb/api/DailyBrowser/allReportingCodes", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,he;q=0.8",
            "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\""
        },
        "referrerPolicy": "no-referrer",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    });

    return res.json()
}
