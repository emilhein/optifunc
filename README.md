[![Coverage Status](https://coveralls.io/repos/github/emilhein/optifunc/badge.svg?branch=master)](https://coveralls.io/github/emilhein/optifunc?branch=master)
[![Build Status](https://travis-ci.org/emilhein/optifunc.svg?branch=master)](https://travis-ci.org/emilhein/optifunc)

## What do i do

For now i only have two functions

#### 1. compare(function1, function2, input1, input2, ...)

simple check if two functions return the same output

#### 2. run([function1, function2, ...], input1, input2,input3, ...)

run x amount of functions with same input and out some execution time statistics.

## basic usage

```js
let { run, compare } = require("optifunc");

let func1 = a => a;
let func2 = a => a;

compare(func1, func2, "Someinput")
    .then(res => run([func1, func2]))
    .then(stats => {
        console.log(stats);
    });

// Output
// ​​​​​[ { function: 'func1', max: 0.034, min: 0.001, avg: '0.005' },​​​​​
// ​​​​​  { function: 'func2', max: 0.001, min: 0.001, avg: '0.001' } ]​​​​​
```
