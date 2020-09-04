const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../build')));
app.use('*', express.static(path.join(__dirname, '../build/index.html')))

app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
});

