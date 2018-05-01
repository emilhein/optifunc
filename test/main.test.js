'use strict';
const {
    run,
    compare
} = require('../module/optifunc');
const test = require('ava');

let func1 = () => 'output for a';
let func2 = a => a;
let func3 = a => {
  let b = a;
  return b;
};


test('A Happy path for the run function', async t => {
  run([ func1, func2 ], 'test')
        .then(succes => {
          t.deepEqual(succes.length, 2);
          t.deepEqual(succes[0].function, 'func1');
          t.deepEqual(succes[1].function, 'func2');
        })
        .catch(err => console.log(err));
});

test('A Happy path for the run function without function', async t => {
  run()
        .then(succes => t.deepEqual(succes.length, 0))
        .catch(err => console.log(err));
});

test('A Happy path for the compare function (similar output)', async t => {
  compare(func2, func3)
        .then(succes => t.deepEqual(succes, 'same output'))
        .catch(err => console.log(err));
});


test('A path in which the function dont comapre', async t => {
  let input = 'SOMEINPUT';
  compare(func1, func2, input)
        .then(succes => console.log(succes))
        .catch(err => {
          t.deepEqual(typeof err, 'object');
        });
});
