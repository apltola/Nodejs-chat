const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', function () {
  it('should reject non-string values', () => {
    const invalidStr = 212234234;
    expect(isRealString(invalidStr)).toBe(false);
  })
})

describe('isRealString', function () {
  it('should reject strings with only spaces', () => {
    const invalidStr = "         ";
    expect(isRealString(invalidStr)).toBe(false);
  })
})

describe('isRealString', function () {
  it('should allow string with non-space characters', () => {
    const validStr = 'lord of the strings';
    expect(isRealString(validStr)).toBe(true);
  })
})
