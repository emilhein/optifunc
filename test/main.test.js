'use strict';
const {
    run,
    compare
} = require('../module/optifunc')
const test = require('ava')


test('A Happy path for the run function', async t => {
    let func1 = a => a
    let func2 = a => a
    run([func1, func2], 'test')
        .then(succes => {
            t.deepEqual(succes.length, 2)
            t.deepEqual(succes[0].function, 'func1')
            t.deepEqual(succes[1].function, 'func2')
        })
        .catch(err => console.log(err))
})

test('A Happy path for the run function without function', async t => {

    run()
        .then(succes => t.deepEqual(succes.length, 0))
        .catch(err => console.log(err))
})