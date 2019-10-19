# hrdate
High Resolution Date Time for Node

## Example:
```
const { hrDate } = require('@theroyalwhee0/hrdate');
const [second, nanosecond] = hrDate();
console.log(`${second}.${nanosecond}`);
```

## History
 - 0.0.5 Move tests to mocha+expect.
 - 0.0.4 Fix off by one error in nanosecond carry.
