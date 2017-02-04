/**
 * hrdate:test/index.js
 */

/**
 * Imports.
 */
const test = require('ava');
const { hrDate, hrDateFactory, lrDate } = require('../src');

/**
 * Constants.
 */
const MAXINTU32 = 2 ** 32;
const ONEMILLION = 1000000;
const ONEFIVEMILLION = 1500000;
const ONEBILLION = 1000000000;

/**
 * hrDate.
 */
test('hrDate: should be a function', (check) => {
  check.is(typeof hrDate, 'function');
  check.is(hrDate.length, 0);
});
test('hrDate: should return a high resolution time array', (check) => {
  const dateBefore = Date.now();
  const results = hrDate();
  const dateAfter = Date.now();
  check.true(Array.isArray(results));
  check.is(results.length, 2);
  const [seconds, nanoseconds] = results;
  check.true(seconds >= 0, `${seconds} >= 0`);
  check.true(nanoseconds >= 0, `${nanoseconds} >= 0`);
  check.true(seconds <= MAXINTU32, `${seconds} <= MAXINTU32`);
  check.true(nanoseconds < ONEBILLION, `${nanoseconds} < ONEBILLION`);
  // NOTE: +/-ONEFIVEMILLION is required because Date.now may
  // return a value that is rounded ahead/behind of the hrDate.
  const beforeSeconds = Math.floor(dateBefore / 1000);
  const beforeNanos = ((dateBefore % 1000) * ONEMILLION) - ONEFIVEMILLION;
  const afterSeconds = Math.floor(dateAfter / 1000);
  const afterNanos = ((dateAfter % 1000) * ONEMILLION) + ONEFIVEMILLION;
  check.true(seconds >= beforeSeconds, `${seconds} >= ${beforeNanos} = false`);
  check.true(nanoseconds >= beforeNanos, `${nanoseconds} >= ${beforeNanos} = false`);
  check.true(seconds <= afterSeconds, `${seconds} <= ${afterSeconds} = false`);
  check.true(nanoseconds <= afterNanos, `${nanoseconds} <= ${afterNanos} = false`);
});
test('hrDate: should only rise over time', async (check) => {
  function resolveAfter(time) {
    return new Promise((resolve) => {
      global.setTimeout(resolve, time || 10);
    });
  }
  const results = [];
  results.push(hrDate());
  results.push(hrDate());
  await resolveAfter(20);
  results.push(hrDate());
  await resolveAfter(40);
  results.push(hrDate());
  await resolveAfter(60);
  results.push(hrDate());
  results.push(hrDate());
  results.push(hrDate());
  await resolveAfter(80);
  results.push(hrDate());
  let last;
  results.forEach((result) => {
    if (last) {
      check.true((
        result[0] >= last[0] && (
          result[0] === last[0] ?
          result[1] > last[1] :
          true
        )
      ), `${result[0]}.${result[1]} > ${last[0]}.${last[1]}`);
    }
    last = result;
  });
});

/**
 * hrDateFactory.
 */
test('hrDateFactory: should be a function', (check) => {
  check.is(typeof hrDateFactory, 'function');
  check.is(hrDateFactory.length, 0);
});
test('hrDateFactory: should build a hrDate function', (check) => {
  const results = hrDateFactory();
  check.is(typeof results, 'function');
  check.is(results.length, 0);
  check.is(results.name, 'hrDate');
});

/**
 * lrDate.
 */
test('lrDate: should be a function', (check) => {
  check.is(typeof lrDate, 'function');
  check.is(lrDate.length, 0);
});
test('lrDate: return the current date time as an array', (check) => {
  const dateBefore = Date.now();
  const results = lrDate();
  const dateAfter = Date.now();
  check.true(Array.isArray(results));
  check.is(results.length, 2);
  const [seconds, nanoseconds] = results;
  check.true(seconds >= 0, `${seconds} >= 0`);
  check.true(nanoseconds >= 0, `${nanoseconds} >= 0`);
  check.true(seconds <= MAXINTU32, `${seconds} <= MAXINTU32`);
  check.true(nanoseconds < ONEBILLION, `${nanoseconds} < ONEBILLION`);
  const beforeSeconds = Math.floor(dateBefore / 1000);
  const beforeNanos = ((dateBefore % 1000) * ONEMILLION);
  const afterSeconds = Math.floor(dateAfter / 1000);
  const afterNanos = ((dateAfter % 1000) * ONEMILLION);
  check.true(seconds >= beforeSeconds, `${seconds} >= ${beforeNanos} = false`);
  check.true(nanoseconds >= beforeNanos, `${nanoseconds} >= ${beforeNanos} = false`);
  check.true(seconds <= afterSeconds, `${seconds} <= ${afterSeconds} = false`);
  check.true(nanoseconds <= afterNanos, `${nanoseconds} <= ${afterNanos} = false`);
});
