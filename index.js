const {
    run,
    compare
} = require('./module/optifunc');

let a = input => {
    let accu = 0
    for (let i = 0; i < 100000; i++) {
        accu = accu + i
    }
    return accu
}
let b = input => {
    return 32
};
let c = input => input + input + '2'

let test = compare(a, a, 3);
console.log(test);