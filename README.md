# hrDate: @theroyalwhee/hrdate
High Resolution Date Time for NodeJS.

No significant attempts were made to profile or measure accuracy this code. It's main purpose is to get unique timestamps.


## Browser Support
hrDate does not support browsers as it depends on `process.hrtime`. It would not hard to add browser support, but `performance.now()` is limited because of [mitigations against Spectre](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now).


## Example
```
const { hrDate } = require('@theroyalwhee0/hrdate');
const [second, nanosecond] = hrDate();
console.log(`${second}.${nanosecond}`);
```


## Links
- GitHub: https://github.com/theroyalwhee0/hrdate
- NPM: https://www.npmjs.com/package/@theroyalwhee0/hrdate
- Changelog: https://github.com/theroyalwhee0/hrdate/blob/main/changelog.md


## Legal & License
Copyright 2017-2023 Adam Mill

This library is released under Apache 2 license. See [LICENSE](https://github.com/theroyalwhee0/hrdate/blob/master/LICENSE) for more details.
