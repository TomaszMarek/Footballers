const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const footballerRoutes = require('./routes/footballers');
const authRoutes = require('./routes/auth');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

//obsługuje żądania
app.use('/api/footballers', footballerRoutes); //CRUD
app.use('/api/auth', authRoutes); //rej i log

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
