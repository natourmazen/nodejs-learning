const express = require('express');
const app = new express();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
