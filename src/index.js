/**
 * hrdate:src/index.js
 */

/**
 * Constants.
 */
const ONEMILLION = 1000000;
const ONEBILLION = 1000000000;

/**
 * Get the current low resolution time as a split second/nanosecond pair array.
 * @return {Array<Number,Number>}         Array pair with seconds/nanoseconds
 * from the current low resolution date time.
 */
function lrDate() {
  const date = Date.now(); // Date in milliseconds
  const seconds = Math.floor(date / 1000);
  const nanoseconds = (date % 1000) * ONEMILLION;
  return [ seconds, nanoseconds ];
}

/**
 * High resolution date time function factory.
 * @param  {Object} options Options.
 * @return {Function}         The hrDate function that was built.
 */
function hrDateFactory(options) {
  const platformHrTime = options && options.platformHrTime
    ? options.platformHrTime
    : process.hrtime;
  const platformLrTime = options && options.platformLrTime
    ? options.platformLrTime
    : lrDate;
  const [ startSeconds, startNanoseconds ] = platformLrTime();
  const startHr = platformHrTime();
  return function hrDate() {
    const [ hrSeconds, hrNanoseconds ] = platformHrTime(startHr);
    let nanoseconds = startNanoseconds + hrNanoseconds;
    let carry = 0;
    if(nanoseconds >= ONEBILLION) {
      carry = Math.floor(nanoseconds / ONEBILLION);
      nanoseconds %= ONEBILLION;
    }
    const seconds = startSeconds + hrSeconds + carry;
    return [ seconds, nanoseconds ];
  };
}

/**
 * Get the current hight resolution time as a split second/nanosecond pair array.
 * @return {Array<Number,Number>}         Array pair with seconds/nanoseconds
 * of the current date time.
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
