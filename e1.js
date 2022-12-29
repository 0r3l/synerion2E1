docReady(async function () {    

    const firstStep = await busyWait(() => document.getElementsByClassName('slick-cell l0 r0 readonly readonly selected row-selected row-selected-top row-selected-bottom row-selected-left')[0])
    firstStep.style.backgroundColor = 'yellow'

    firstStep.addEventListener("click", async function () {
        console.log('im clicked!')
        const secondStep = await busyWait(() => document.querySelector('[id^=ResourceAssignmentManager] ul li:last-child'))
        secondStep.style.background = 'yellow'
        secondStep.addEventListener("click", async function(){
            const thirdStep = await busyWait(() => document.querySelector('[id^="standard-dialog-"]'))
            const inputText = thirdStep.querySelector('input[id^="field-"]')
            inputText.value = 'Non Working Period'
        })        
    })    

})


async function busyWait(fn){
    let counter = 0;
    let el;
    const sleep = () => new Promise( resolve => setTimeout(resolve, 500) )
    do {
        await sleep()
        el = fn()
    } while (!el && ++counter < 75)

    return el
}