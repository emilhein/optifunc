"use strict";
const assert = require("assert");
const { run, compare } = require("./../module/optifunc");
let func1 = () => "output for a";
let func2 = a => a;
let func3 = a => {
    let b = a;
    return b;
};
const errFunc = () => {
    throw TypeError("Error");
};

describe("The modeule test suite", function() {
    it("A Happy path for the run function", async () => {
        run([func1, func2], "test")
            .then(succes => {
                assert.deepEqual(succes.length, 2);
                assert.deepEqual(succes[0].function, "func1");
                assert.deepEqual(succes[1].function, "func2");
            })
            .catch(err => console.log(err));
    });
    it("A UNHAPPY path for the run function", async () => {
        run([errFunc, func2], "test")
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
        compare(func2, func3)
            .then(succes => assert.deepEqual(succes, "same output"))
            .catch(err => console.log(err));
    });

    it("A path in which the function dont comapre", async () => {
        let input = "SOMEINPUT";
        compare(func1, func2, input)
            .then(succes => console.log(succes))
            .catch(err => {
                assert.deepEqual(typeof err, "object");
            });
    });
});
