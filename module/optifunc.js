"use strict";
const assert = require("assert");

const REPEAT_TIMES = 10;
const stringArrToFloat = arr => arr.map(ele => parseFloat(ele));

const getAverage = arr => (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(3);
const getMax = arr => Math.max(...arr);
const getMin = arr => Math.min(...arr);

const run = ({ functions = [], runTimes = REPEAT_TIMES } = {}, ...parameters) => {
    return new Promise((resolve, reject) => {
        try {
            let returnSat = [];
            let executionTimes = functionExecuter({ functions, runTimes }, ...parameters);
            executionTimes.map(fun => {
                let timeNumbers = stringArrToFloat(fun.executionTimes);
                let funcStat = {
                    function: fun.name,
                    max: getMax(timeNumbers),
                    min: getMin(timeNumbers),
                    avg: getAverage(timeNumbers)
                };
                returnSat.push(funcStat);
            });
            resolve(returnSat);
        } catch (error) {
            reject(error);
        }
    });
};

const functionExecuter = ({ functions, runTimes }, ...parameters) => {
    const times = [];
    functions.map(func => {
        let res = runFuncXTimes(func, runTimes, ...parameters);
        times.push(res);
    });
    return times;
};

const runFuncXTimes = (func, times, ...input) => {
    let executionTimes = [];
    for (let i = 0; i <= times; i++) {
        let exeTime = timeFunction(func, ...input);
        executionTimes.push(exeTime);
    }

    return {
        name: func.name,
        executionTimes
    };
};

const elapsed_time = start => {
    const precision = 3; // 3 decimal places
    const elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
    return elapsed.toFixed(precision);
};

const timeFunction = (func, ...input) => {
    const start = process.hrtime();
    func(...input); // run without care for output
    return elapsed_time(start);
};
const compare = ({ functions = [], args = [] }) => {
    return new Promise((resolve, reject) => {
        try {
            let firstRes = functions[0](...args);
            functions.forEach(func => {
                assert.deepEqual(func(...args), firstRes);
            });
            resolve("same output");
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    run,
    compare
};
