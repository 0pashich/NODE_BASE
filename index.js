

// console.log('Record 1');

// setTimeout(() => {
//     console.log('Record 2');
//     Promise.resolve().then(() => {
//         setTimeout(() => {
//             console.log('Record 3');
//             Promise.resolve().then(() => {
//                 console.log('Record 4');
//             });
//         });
//     });
// });

// console.log('Record 5');

// Promise.resolve().then(() =>
//     Promise.resolve().then(() =>
//         console.log('Record 6')
//     )
// );

// 1 5 6 2 3 4   



const EventEmitter = require('events');

const myEmitter = new EventEmitter();
// myEmitter.setMaxListeners(50);

if (process.argv.length < 3) {
    console.log('Не задано ни одного таймера.')
}

let argsArr = [];


let regexp = /^\d\d-\d\d-\d\d-\d\d\d\d$/;


for (let i = 2; i <= process.argv.length - 1; i++) {
    regexp.lastIndex = 0
    if (regexp.test(process.argv[i])) {
        let timerDateArray = process.argv[i].split('-');
        let timerDate = Date.parse(`${timerDateArray[3]}-${timerDateArray[2]}-${timerDateArray[1]}T${timerDateArray[0]}:00:00`);
        // console.log('timerDate: ' + timerDate);
        // console.log('date', new Date(timerDate));
        argsArr.push(timerDate);
    } else {
        console.log(`Аргумент ${i - 1} имеет неверный формат`)
    }
}
//     console.log('new emiter:', i);


// console.log(argsArr);




// // const time = '12-09-12-2021'

// var now = new Date();
// var arg = new Date(2022, 11, 19, 12, 0, 0, 0);







// console.log(arg);
// console.log(now);



// var timer = new Date(arg - now);
// console.log(timer);


// var options = {
//     era: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     weekday: 'long',
//     timezone: 'UTC',
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric'
// };

// console.log(timer.toLocaleString("ru", options));
// console.log(timer.toString());
// console.log(timer.toDateString());
// console.log(timer.toTimeString());

// var diff = arg - now;

// var vdaysdiff; // difference of the dates
// var vhourDiff;
// var vmindiff;
// var vsecdiff;

// vdaysdiff = Math.floor(diff / 1000 / 60 / 60 / 24);  // in days
// diff -= vdaysdiff * 1000 * 60 * 60 * 24;

// console.log(vdaysdiff);


// vhourDiff = Math.floor(diff / 1000 / 60 / 60);  // in hours
// diff -= vhourDiff * 1000 * 60 * 60;

// console.log(vhourDiff);

// vmindiff = Math.floor(diff / 1000 / 60); // in minutes
// diff -= vmindiff * 1000 * 60;

// console.log(vmindiff);

// vsecdiff = Math.floor(diff / 1000);  // in seconds

// console.log(vsecdiff);


// console.log(`Timer ${vdaysdiff} days ${vhourDiff}:${vmindiff}:${vsecdiff} `);

const intervalHendler = () => {
    // console.log(Date.now());
    myEmitter.emit('event', Date.now(), argsArr);
}
setInterval(intervalHendler, 1000);

// var dateArray = [1, 2, 3, 4, 5]


// console.log(Date.now());
// console.log(`Timer ${vdaysdiff} days ${vhourDiff}:${vmindiff}:${vsecdiff} `);

// setInterval(intervalHendler, 1000);

//Text formatting
// var hourtext = '00';
// if (hourDiff > 0) { hourtext = String(hourDiff); }
// if (hourtext.length == 1) { hourtext = '0' + hourtext };

// var mintext = '00';
// if (mindiff > 0) { mintext = String(mindiff); }
// if (mintext.length == 1) { mintext = '0' + mintext };

// //shows output as HH:MM ( i needed shorter duration)
// duration.value = hourtext + ':' + mintext;

// console.log(duration);
// console.log('proc-arg:', process.argv.length);


// for (i = 3; i <= process.argv.length; i++) {
//     console.log('new emiter:', i);

myEmitter.on('event', function (nowDate, args) {
    console.clear();

    args.forEach((element, index) => {
        // console.log('element', element);
        let diff = element - nowDate;
        if (diff <= 0) {
            console.log(`Таймер ${index}: Время вышло`);
        } else {
            let daysdiff; // difference of the dates
            let hourDiff;
            let mindiff;
            let secdiff;
            daysdiff = Math.floor(diff / 1000 / 60 / 60 / 24);  // in days
            diff -= daysdiff * 1000 * 60 * 60 * 24;
            hourDiff = Math.floor(diff / 1000 / 60 / 60);  // in hours
            diff -= hourDiff * 1000 * 60 * 60;
            mindiff = Math.floor(diff / 1000 / 60); // in minutes
            diff -= mindiff * 1000 * 60;
            secdiff = Math.floor(diff / 1000);  // in seconds

            console.log(`Таймер ${index}: ${daysdiff} дней ${hourDiff}:${mindiff}:${secdiff}`)
        }


        // console.log(vdaysdiff);
        // console.log(vhourDiff);
        // console.log(vmindiff);

        // console.log(vsecdiff);
    });


    // console.log('args:', args);
    // // console.log('this:', this, this === myEmitter);
    // console.log('nowDate', nowDate);
    // // console.log(Date.now());

})
// }

// myEmitter.on('event', function firstListener() {
//     console.log('Helloooo! first listener');
// });

// myEmitter.on('event', function secondListener(arg1, arg2) {
//     console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
// });

//console.log(myEmitter.listeners('event'));

// myEmitter.emit('event', 1, 2, 3, 4, 5);


// const EVENTS = {
//     send: 'send-docs',
// }

// const RequestTypes = [
//     {
//         type: 'send',
//         payload: 'to send a document',
//     },
//     {
//         type: 'receive',
//         payload: 'to receive a document',
//     },
//     {
//         type: 'sign',
//         payload: 'to sign a document',
//     },
// ];

// class Customer {
//     constructor({ type, payload }) {
//         this.type = type;
//         this.payload = payload;
//     }
// }

// const generateIntInRange = (min, max) => {
//     return Math.floor(Math.random() * (max - min + 1) + min);
// };

// const generateNewCustomer = () => {
//   const randomIndex = generateIntInRange(0, RequestTypes.length - 1);
//   const randomCustomerType = RequestTypes[randomIndex];

//   return new Customer(randomCustomerType);
// }

// const run = async () => {
//   const { type, payload } = generateNewCustomer();

//   emitter.emit(type, payload);

//   await new Promise(resolve => setTimeout(resolve, generateIntInRange(1000, 5000)));
//   await run();
// }

// // emitter.emit('test');
// // emitter.on('test', () => console.log('Test!'));
// // emitter.emit('test');

// class Handler {
//     static send(payload) {
//         console.log('Send request', payload);
//     }
//     static receive(payload) {
//         console.log('Receive request', payload);
//     }
//     static sign(payload) {
//         console.log('Sign request', payload);
//     }
// }

// emitter.on('send', Handler.send);
// emitter.on('receive', Handler.receive);
// emitter.on('sign', () => {
//     // Handler.sign();
//     emitter.emit('error', 'Broken pen =(');
// });
// emitter.on('error', console.log);

// run();

















// const colors = require("colors/safe");

// //console.log(colors.red("Hello World!"));

// if (Number.isInteger(+process.argv[2]) &&
//     Number.isInteger(+process.argv[3]) &&
//     Number.parseInt(process.argv[2]) >= 0 &&
//     Number.parseInt(process.argv[3]) >= 0
// ) {
//     let begin = Number.parseInt(process.argv[2]);
//     let end = Number.parseInt(process.argv[3]);
//     let color = 1;
//     let found_prime = false;
//     nextPrime:
//     for (let i = begin; i <= end; i++) {
//         let sqr = Math.sqrt(i)
//         for (let j = 2; j < sqr; j++) {
//             if (i % j == 0) continue nextPrime;
//         }
//         found_prime = true;
//         if (color == 1) {
//             console.log(colors.green(i));
//             color++;
//         } else if (color == 2) {
//             console.log(colors.yellow(i));
//             color++;
//         } else if (color == 3) {
//             console.log(colors.red(i));
//             color = 1;
//         }
//     }
//     if (!found_prime) {
//         console.log(colors.red("Простых чисел не найдено"));
//     }

// } else {
//     console.error(colors.red("Неверно задан диапазон"));
// }

// console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }]);
// console.clear()
// console.assert(true, 'does nothing');
// console.assert(false, 'Whoops %s work', 'didn\'t');
// console.assert();