const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./mwares/errorMiddleware');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const { connect } = require('./db');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/files', express.static(path.join(__dirname, 'files')));
app.use(fileUpload());
app.use('/api/webshop/user', require('./routes/userRoutes'));
app.use('/api/webshop/markak', require('./routes/markakRoutes'));
app.use('/api/webshop/tipusok', require('./routes/tipusokRoutes'));
app.use('/api/webshop/termekek', require('./routes/termekekRoutes'));
app.use('/api/webshop/szalcimek', require('./routes/szalcimRoutes'));
app.use('/api/webshop/rendeles', require('./routes/rendelesRoutes'));
app.use('/api/webshop/keszlet', require('./routes/keszletRoutes'));
app.use('/api/webshop/kepek', require('./routes/kepekRoutes'));
app.use(errorHandler);

connect();

app.listen(process.env.PORT, () => { console.log('Running, port: ' + process.env.PORT) });

app.get('/', (req, res) => {
    res.send('WebShop');
});