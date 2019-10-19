/**
 * @theroyalwhee0/hrdate:test/hrdatefactory.spec.js
 */

/**
 * Imports.
 */
const chai = require('chai');
const { hrDateFactory } = require('../src');
const { expect } = chai;

/**
 * Tests.
 */
describe('hrdate', () => {
  describe('hrDateFactory', () => {
    it('should be a function', () => {
      expect(hrDateFactory).to.be.a('function');
      expect(hrDateFactory.length).to.equal(1);
    });
    it('should build a hrDate function', () => {
      const results = hrDateFactory();
      expect(results).to.be.a('function');
      expect(results.length).to.equal(0);
      expect(results.name).to.equal('hrDate');
    });
    it('should not have off by one issue in nanosecond carry', () => {
      // Issue: Off by one in nanosecond carry. https://github.com/theroyalwhee0/hrdate/issues/1
      const hrDateCarry = hrDateFactory({
        platformLrTime: () => [ 1, 999999000 ],
        platformHrTime: () => [ 0, 1000 ],
      });
      const results = hrDateCarry();
      expect(results).to.be.an('array');
      const [ seconds, nanoseconds ] = results;
      expect(seconds).to.equal(2);
      expect(nanoseconds).to.equal(0);
    });
  });
});
