const daysE = document.getElementById('days')
const hoursE = document.getElementById('hours')
const minE = document.getElementById('min')
const secE = document.getElementById('sec')

const state = {
    days: null,
    hours: null,
    min: null,
    sec: null
}

function getUpToDate() {
    const CurrentDate = new Date();
    const newMonth = CurrentDate.getMonth() === 11 ? 0 : CurrentDate.getMonth() + 2
    const newYear = newMonth === 0 ? CurrentDate.getFullYear() + 1 : CurrentDate.getFullYear()
    const dat = newMonth.toString() + '.01.' + newYear.toString();
    return new Date(dat);
}

function countDate(){
    const upToDate = getUpToDate();
    const currentDate = new Date();

    const totalsec = Math.floor((upToDate-currentDate) / 1000); 
    const days = Math.floor(totalsec / 3600 / 24);
    const hours = Math.floor(totalsec / 3600) % 24;
    const min = Math.floor(totalsec / 60) % 60;
    const sec = totalsec % 60;

    function format(e) {
        if(e < 10) return '0' + e.toString()
        return e.toString()
    }

    if(state.days !== days) {
        state.days = days;
        flip(daysE, format(days))
    }
    if(state.hours !== hours) {
        state.hours = hours;
        flip(hoursE, format(hours))
    }
    if(state.min !== min) {
        state.min = min;
        flip(minE, format(min))
    }
    if(state.sec !== sec) {
        state.sec = sec;
        flip(secE, format(sec))
    }
}

function flip(el, val) {
    const wrap = el.parentElement
    el.querySelector('.back > .text').innerHTML = val
    wrap.addEventListener('transitionend', () => {
        el.querySelector('.front > .text').innerHTML = val
        wrap.classList.remove('flip')
    })
    
    wrap.classList.add('flip')
}

const inteval = setInterval(countDate, 1000)