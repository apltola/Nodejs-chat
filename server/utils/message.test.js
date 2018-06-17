const expect = require('expect');
const  { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'ismael';
    const text = 'test message';
    const message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('string');
    expect(message).toHaveProperty('from', 'text', 'createdAt');
  })
})