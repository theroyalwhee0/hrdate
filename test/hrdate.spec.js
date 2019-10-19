/**
 * @theroyalwhee0/hrdate:it/hrdate.spec.js
 */

/**
 * Imports.
 */
const chai = require('chai');
const { hrDate } = require('../src');
const { expect } = chai;

/**
 * Constants.
 */
const MAXINTU32 = 2 ** 32;
const ONEMILLION = 1000000;
const ONEFIVEMILLION = 1500000;
const ONEBILLION = 1000000000;

/**
 * Tests.
 */
describe('hrdate', () => {
  describe('hrDate', () => {
    it('should be a function', () => {
      expect(hrDate).to.be.a('function');
      expect(hrDate.length).to.equal(0);
    });
    it('should return a high resolution time array', () => {
      const dateBefore = Date.now();
      const results = hrDate();
      const dateAfter = Date.now();
      expect(results).to.be.an('array');
      expect(results.length).to.equal(2);
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
    it('should only rise over time', async () => {
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
      for(let item of results) {
        expect(results).to.be.an('array');
        if(!last) {
          last = item;
          continue;
        }
        const [ seconds, nanoseconds ] = item;
        const [ lastSeconds, lastNanoseconds ] = last;
        expect(seconds).to.be.at.least(lastSeconds);
        if(seconds === lastSeconds) {
          expect(nanoseconds).to.be.at.least(lastNanoseconds);
        }
      }
    });
  });
});
