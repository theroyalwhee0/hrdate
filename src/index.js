/**
 * hrdate:src/index.js
 */

/**
 * Constants.
 */
const ONEMILLION = 1000000;
const ONEBILLION = 1000000000;

/**
 * Get the current low resolution time as
 * a split second/nanosecond pair array.
 */
function lrDate() {
  const date = Date.now(); // Date in milliseconds
  const seconds = Math.floor(date / 1000);
  const nanoseconds = (date % 1000) * ONEMILLION;
  return [seconds, nanoseconds];
}

/**
 * High resolution date time function factory.
 */
function hrDateFactory() {
  const [startSeconds, startNanoseconds] = lrDate();
  const startHr = process.hrtime();
  return function hrDate() {
    const [hrSeconds, hrNanoseconds] = process.hrtime(startHr);
    let nanoseconds = startNanoseconds + hrNanoseconds;
    let carry = 0;
    if (nanoseconds > ONEBILLION) {
      carry = Math.floor(nanoseconds / ONEBILLION);
      nanoseconds %= ONEBILLION;
    }
    const seconds = startSeconds + hrSeconds + carry;
    return [seconds, nanoseconds];
  };
}

/**
 * hrDate.
 */
const hrDate = hrDateFactory();

/**
 * Exports.
 */
module.exports = {
  hrDate,
  hrDateFactory,
  lrDate,
};
