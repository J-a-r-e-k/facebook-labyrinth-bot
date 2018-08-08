const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', require('./lib/routes/index'));
app.get('/webhook', require('./lib/routes/verification'));
app.post('/webhook', require('./lib/routes/webhook'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));