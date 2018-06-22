const moment = require('moment');

const generateMessage = (from, text) => {
  return {
    from: from,
    text: text,
    createdAt: moment().valueOf()
  };
};

const generateLocationMessage = (from, lat, lng) => {
  return {
    from: from,
    url: `https://www.google.com/maps?q=${lat},${lng}`,
    createdAt: moment().valueOf()
  }
};

module.exports = { generateMessage, generateLocationMessage };