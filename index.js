const EventEmitter = require('events');
const emitter = new EventEmitter();

class Timer {
    constructor({ index, date }) {
        this.index = index;
        this.date = date;
    }
}

const generateNewTimer = (index, arg) => {
    const argArr = arg.split('-');
    const date = Date.parse(`${argArr[3]}-${argArr[2]}-${argArr[1]}T${argArr[0]}:00:00`);
    return new Timer({ index, date });
}



const intervalHendler = (timerArr) => {
    emitter.emit('clear',);
    let now = Date.now();
    timerArr.forEach((element) => {
        if (now < element.date) {
            emitter.emit('event', now, element);
        } else {
            emitter.emit('end', element);
        }
    })
}


if (process.argv.length < 3) {
    emitter.emit('error', 'Не задано ни одного таймера.')
} else {

    let timerArr = [];
    let argumentCheck = /^\d\d-\d\d-\d\d-\d\d\d\d$/;

    for (let i = 2; i <= process.argv.length - 1; i++) {
        argumentCheck.lastIndex = 0
        if (argumentCheck.test(process.argv[i])) {
            timerArr.push(generateNewTimer(i - 1, process.argv[i]));
        } else {
            console.log(`Аргумент ${i - 1} имеет неверный формат`);

        }
    }

    setInterval(intervalHendler, 1000, timerArr);
}

emitter.on('event', (nowDate, timer) => {
    let diff = timer.date - nowDate;
    let daysDiff = Math.floor(diff / 1000 / 60 / 60 / 24);
    diff -= daysDiff * 1000 * 60 * 60 * 24;
    let hourDiff = Math.floor(diff / 1000 / 60 / 60);
    diff -= hourDiff * 1000 * 60 * 60;
    let minDiff = Math.floor(diff / 1000 / 60);
    diff -= minDiff * 1000 * 60;
    let secDiff = Math.floor(diff / 1000);
    console.log(`Таймер ${timer.index}: ${daysDiff} дней ${hourDiff}:${minDiff}:${secDiff}`)
});

emitter.on('clear', () => console.clear())
emitter.on('end', (timer) => console.log(`Таймер ${timer.index}: Время вышло`))
emitter.on('error', console.log);