const {
    default: playground,
} = require('graphql-playground-middleware-express');
const { rainbow } = require('chalk-animation');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

// Initialize environment
require('dotenv').config();
const app = express();

// Connect the mangos
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
});

// Load middlware
app.use(bodyParser.json());
app.use(cors());

// Load routes
app.use('/assets', express.static(process.env.STATIC));
app.get('/', playground({ endpoint: '/graphql' }));

const MESSAGE = `GraphQL Sewvew: http://localhost:${process.env.PORT} owo
Socket Sewvew: http://localhost:${process.env.SOCKET} uwu\n`;

// Load services
Promise.all([require('./socket')(app), require('./initGraph')(app)]).then(
    () => {
        // If we reach this, we gucci
        app.listen(process.env.PORT, () => {
            if (process.env.NODE_ENV === 'production') {
                console.log(MESSAGE);
            } else {
                rainbow(MESSAGE, 0.2).render();
            }
        });
    },
);
