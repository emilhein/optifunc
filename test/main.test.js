"use strict";
const assert = require("assert");
const { run, compare } = require("./../module/optifunc");
let func1 = () => "output for a";
let func2 = a => a;
let func2Diff = a => "Something lse";
let func3 = a => {
    let b = a;
    return b;
};
const errFunc = () => {
    throw TypeError("Error");
};

describe("The modeule test suite", function() {
    it("A Happy path for the run function", async () => {
        run({ functions: [func1, func2] }, "test")
            .then(succes => {
                assert.deepEqual(succes.length, 2);
                assert.deepEqual(succes[0].function, "func1");
                assert.deepEqual(succes[1].function, "func2");
            })
            .catch(err => console.log(err));
    });
    it("A Happy path for the run function with runTimes parameter", async () => {
        run({ functions: [func1, func2], runTimes: 20 }, "test")
            .then(succes => {
                assert.deepEqual(succes.length, 2);
                assert.deepEqual(succes[0].function, "func1");
                assert.deepEqual(succes[1].function, "func2");
            })
            .catch(err => console.log(err));
    });
    it("A UNHAPPY path for the run function", async () => {
        run({ functions: [errFunc, func2] }, "test")
            .then(succes => {
                console.log(succes);
            })
            .catch(err => assert.equal(err.message, "Error"));
    });

    it("A Happy path for the run function without function", async () => {
        run()
            .then(succes => assert.deepEqual(succes.length, 0))
            .catch(err => console.log(err));
    });

    it("A Happy path for the compare function (similar output)", async () => {
        compare({ functions: [func2, func3, func2] })
            .then(succes => assert.deepEqual(succes, "same output"))
            .catch(err => console.log(err));
    });

    it("A path in which the function dont comapre", async () => {
        let input = "SOMEINPUT";
        compare({ functions: [func1, func2], args: [input] })
            .then(succes => console.log(succes))
            .catch(err => {
                assert.deepEqual(typeof err, "object");
            });
    });
});
