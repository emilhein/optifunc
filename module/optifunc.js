'use strict'
const assert = require('assert')
const AssertionError = require('assert').AssertionError;

const REPEAT_TIMES = 10
const stringArrToFloat = arr => arr.map(ele => parseFloat(ele))

const getAverage = arr => (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(3)
const getMax = arr => Math.max(...arr);
const getMin = arr => Math.min(...arr);

const run = (functions = [], ...parameters) => {
    let returnSat = []
    let executionTimes = functionExecuter(functions, ...parameters)
    executionTimes.map(fun => {
        let timeNumbers = stringArrToFloat(fun.executionTimes)
        console.log(timeNumbers);
        let funcStat = {
            function: fun.name,
            max: getMax(timeNumbers),
            min: getMin(timeNumbers),
            avg: getAverage(timeNumbers)
        }
        returnSat.push(funcStat);
    })
    return returnSat
}


let functionExecuter = (functions = [], ...parameters) => {
    const times = []
    functions.map(func => {
        let res = runFuncXTimes(func, REPEAT_TIMES, ...parameters);
        times.push(res);
    })
    return times;
}

const runFuncXTimes = (func, times, ...input) => {
    let executionTimes = []
    for (let i = 0; i <= times; i++) {
        let exeTime = timeFunction(func, ...input)
        executionTimes.push(exeTime);
    }

    return {
        name: func.name,
        executionTimes
    }
}

const elapsed_time = start => {
    let precision = 3; // 3 decimal places
    let elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
    // console.log(process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms - "); // print message + time
    // start = process.hrtime(); // reset the timer
    return elapsed.toFixed(precision)
}

const timeFunction = (func, ...input) => {
    let start = process.hrtime();
    func(...input); // run without care for output
    return elapsed_time(start)
}
const compare = (func1, func2, ...args) => {
    try {
        assert.deepEqual(func1(...args), func2(...args))

        return 'same output'
    } catch (e) {
        if (e instanceof AssertionError) {
            return e
        } else {
            // Output unexpected Errors.
            console.log(e);
        }
    }
}
module.exports = {
    run,
    compare
};