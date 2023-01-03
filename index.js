const express = require('express');
const app = express;
app.request(express.static('public'));
app.listen(3000);