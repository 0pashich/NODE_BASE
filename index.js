const colors = require("colors/safe");

//console.log(colors.red("Hello World!"));

if (Number.isInteger(+process.argv[2]) &&
    Number.isInteger(+process.argv[3]) &&
    Number.parseInt(process.argv[2]) >= 0 &&
    Number.parseInt(process.argv[3]) >= 0
) {
    let begin = Number.parseInt(process.argv[2]);
    let end = Number.parseInt(process.argv[3]);
    let color = 1;
    let found_prime = false;
    nextPrime:
    for (let i = begin; i <= end; i++) {
        let sqr = Math.sqrt(i)
        for (let j = 2; j < sqr; j++) {
            if (i % j == 0) continue nextPrime;
        }
        found_prime = true;
        if (color == 1) {
            console.log(colors.green(i));
            color++;
        } else if (color == 2) {
            console.log(colors.yellow(i));
            color++;
        } else if (color == 3) {
            console.log(colors.red(i));
            color = 1;
        }
    }
    if (!found_prime) {
        console.log(colors.red("Простых чисел не найдено"));
    }

} else {
    console.error(colors.red("Неверно задан диапазон"));
}

