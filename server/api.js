const express = require('express');
const cors = require('cors');

const sequelize = require('./db');
const models = require('./models/index');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandlingMiddlewares');

require('dotenv')
    .config();
const config = require('./config');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(config.port, async () => {
            console.log(`\nServer started on ${config.host}:${config.port}`);
        });
    } catch(error) {
        console.log(error);
    }
};

start();