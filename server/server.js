require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({
  extended: true
}));

require('./routes/user')(app);
// require('./routes/todo')(app);
app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
