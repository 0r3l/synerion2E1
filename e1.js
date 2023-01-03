receiveMessage(function (message, sender) {
    console.log('received message from background')
    const { daysInMonth, year, month, nwh } = message.s2e
    docReady(async function () {
        e1(daysInMonth, month, year, nwh)
    })
})

async function e1(daysInMonth, month, year, nwh) {

    console.log('Synerion2E1 extension script started...')

    const firstStep = await busyWait(() => document.getElementsByClassName('slick-cell l0 r0 readonly readonly selected row-selected row-selected-top row-selected-bottom row-selected-left')[0])
    firstStep.style.backgroundColor = 'yellow'

    firstStep.addEventListener("click", async function () {
        console.log('im clicked!')
        const secondStep = await busyWait(() => document.querySelector('[id^=ResourceAssignmentManager] ul li:last-child'))
        secondStep.style.background = 'yellow'
        secondStep.addEventListener("click", async function () {
            const thirdStep = await busyWait(() => document.querySelector('[id^="standard-dialog-"]'))
            const nwhInputText = thirdStep.querySelector('input[id^="field-"]')
            nwhInputText.value = 'Non Working Period'
            const fourthStep = await busyWait(() => document.querySelector('[id^="standard-dialog-"]'))
            const endDateInputText = fourthStep.querySelectorAll('input[id^="text-widget-"]')[1]
            endDateInputText.value = `${month}/${daysInMonth}/${year}`
            
            const effortInputText = fourthStep.querySelectorAll('input[id^="text-widget-"]')[2]
            effortInputText.value = `${nwh.toFixed(2)}h`
        })
    })
}
