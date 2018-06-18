const generateMessage = (from, text) => {
  return {
    from: from,
    text: text,
    createdAt: new Date().toLocaleTimeString()
  };
};

const generateLocationMessage = (from, lat, lng) => {
  return {
    from: from,
    url: `https://www.google.com/maps?q=${lat},${lng}`,
    createdAt: new Date().toLocaleTimeString()
  }
};

module.exports = { generateMessage, generateLocationMessage };