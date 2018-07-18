const express = require('express');
const app = express();
app.use(express.static('incrementNumber'));
app.listen(3000, () => console.log('Example app listening on port 3000!'));