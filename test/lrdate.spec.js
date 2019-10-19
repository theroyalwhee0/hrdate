/**
 * @theroyalwhee0/hrdate:test/lrdate.spec.js
 */

/**
 * Imports.
 */
const chai = require('chai');
const { lrDate } = require('../src');
const { expect } = chai;

/**
 * Constants.
 */
const MAXINTU32 = 2 ** 32;
const ONEBILLION = 1000000000;

/**
 * Tests.
 */
describe('hrdate', () => {
  describe('lrDate', () => {
    it('should be a function', () => {
      expect(lrDate).to.be.a('function');
      expect(lrDate.length).to.equal(0);
    });
    it('should return the current date time as an array', () => {
      const dateBefore = Date.now();
      const results = lrDate();
      const dateAfter = Date.now();
      expect(results).to.be.an('array');
      expect(results.length).to.equal(2);
      // Check that it is in a valid range.
      const [ seconds, nanoseconds ] = results;
      expect(seconds).to.be.at.least(0);
      expect(nanoseconds).to.be.at.least(0);
      expect(seconds).to.be.at.most(MAXINTU32);
      expect(nanoseconds).to.be.at.most(ONEBILLION);
      // Check that it is aprox what is expected.
      const beforeSeconds = Math.floor(dateBefore / 1000) - 1;
      const afterSeconds = Math.floor(dateAfter / 1000) + 1;
      expect(seconds).to.be.at.least(beforeSeconds);
      expect(seconds).to.be.at.most(afterSeconds);
    });
  });
});
