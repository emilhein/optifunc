

## basic usage
```js
let {run, compare} = require('optifunc')

let func1 = a => a
let func2 = a => a

compare(func1, func2)
.then(res =>{
    console.log(`comaprison: ${res}`);
    return run([func1, func2])
})
.then(console.log)
.catch(console.log)

```
