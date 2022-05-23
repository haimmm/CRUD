const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}))

app.use('/auth', require('./routes/auth.route'));
app.use('/user', require('./routes/user.route'));

//error handling
app.use((err, req, res, next) => {
    const { message, status } = err;
    console.log('ERROR:', err);
    res.status(status || 400).send({
        error: true,
        message: message || err
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
