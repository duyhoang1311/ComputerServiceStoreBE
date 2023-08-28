const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const port = 3001;
const routes = require('./routes/index');
const mongoose = require('mongoose');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to mongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB: ', error));

routes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
