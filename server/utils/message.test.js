const expect = require('expect');
const  { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'ismael';
    const text = 'test message';
    const message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toHaveProperty('from', 'text', 'createdAt');
  })
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const sender = 'allu';
    const latitude = 60;
    const longitude = 24;

    const locationMessage = generateLocationMessage(sender, latitude, longitude);
    expect(locationMessage.url).toEqual(`https://www.google.com/maps?q=60,24`)
  })
})
