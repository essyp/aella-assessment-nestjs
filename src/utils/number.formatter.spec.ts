/*
 * Tests
 */
import { NumberFormatter } from '@/utils/number.formatter';

describe('NumberFormatter', () => {
  let util: NumberFormatter;

  it('should be defined', () => {
    const tests = [
      { num: 0, digits: 1 },
      { num: 12, digits: 1 },
      { num: 1234, digits: 1 },
      { num: 100000000, digits: 1 },
      { num: 299792458, digits: 1 },
      { num: 759878, digits: 1 },
      { num: 759878, digits: 0 },
      { num: 123, digits: 1 },
      { num: 123.456, digits: 1 },
      { num: 123.456, digits: 2 },
      { num: 123.456, digits: 4 },
    ];
    tests.forEach(function (test) {
      console.log(
        'nFormatter(' +
          test.num +
          ', ' +
          test.digits +
          ') = ' +
          NumberFormatter.format(test.num, test.digits),
      );
    });
  });
});
