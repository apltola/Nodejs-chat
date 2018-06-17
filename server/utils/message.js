const generateMessage = (from, text) => {
  return {
    from: from,
    text: text,
    createdAt: new Date().toLocaleTimeString()
  };
};

module.exports = { generateMessage };