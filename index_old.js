const EventEmitter = require('events');
const emitter = new EventEmitter();


if (process.argv.length < 3) {
    console.log('Не задано ни одного таймера.')
} else {

    let argsArr = [];
    let argumentCheck = /^\d\d-\d\d-\d\d-\d\d\d\d$/;

    for (let i = 2; i <= process.argv.length - 1; i++) {
        regexp.lastIndex = 0
        if (argumentCheck.test(process.argv[i])) {
            let timerDateArray = process.argv[i].split('-');
            let timerDate = Date.parse(`${timerDateArray[3]}-${timerDateArray[2]}-${timerDateArray[1]}T${timerDateArray[0]}:00:00`);
            argsArr.push(timerDate);
        } else {
            console.log(`Аргумент ${i - 1} имеет неверный формат`)
        }
    }

    const intervalHendler = () => {
        emitter.emit('event', Date.now(), argsArr);
    }
    setInterval(intervalHendler, 1000);
}

emitter.on('event', function (nowDate, args) {
    console.clear();
    args.forEach((element, index) => {
        let diff = element - nowDate;
        if (diff <= 0) {
            console.log(`Таймер ${index}: Время вышло`);
        } else {
            let daysDiff = Math.floor(diff / 1000 / 60 / 60 / 24);
            diff -= daysDiff * 1000 * 60 * 60 * 24;
            let hourDiff = Math.floor(diff / 1000 / 60 / 60);
            diff -= hourDiff * 1000 * 60 * 60;
            let minDiff = Math.floor(diff / 1000 / 60);
            diff -= minDiff * 1000 * 60;
            let secDiff = Math.floor(diff / 1000);

            console.log(`Таймер ${index}: ${daysDiff} дней ${hourDiff}:${minDiff}:${secDiff}`)
        }
    });

})



