# hrDate: @theroyalwhee/hrdate
High Resolution Date Time for Node


## Example
```
const { hrDate } = require('@theroyalwhee0/hrdate');
const [second, nanosecond] = hrDate();
console.log(`${second}.${nanosecond}`);
```

## Links
- GitHub: https://github.com/theroyalwhee0/hrdate
- NPM: https://www.npmjs.com/package/@theroyalwhee0/hrdate


## History
- v1.0.3 - 2022-06-04
  - Bump depends for security.
- v1.0.2 - 2021-06-11
  - Bump depends for security.
  - Add dryrun scriptlet.
- v1.0.1 - 2021-01-29
  - Bump devdepends.
  - Improve readme.
- v1.0.0
  - Move tests to mocha+expect.
- v0.0.4
  - Fix off by one error in nanosecond carry.


## Legal & License
Copyright 2017-2021 Adam Mill

This library is released under Apache 2 license. See [LICENSE](https://github.com/theroyalwhee0/hrdate/blob/master/LICENSE) for more details.
