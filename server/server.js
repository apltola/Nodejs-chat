const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');

const app = express();
app.use(express.static(publicPath));
console.log(publicPath);


const PORT = process.env.PORT || 3222;
app.listen(PORT);
console.log(`THE SERVER LIVES!! ${PORT}`);