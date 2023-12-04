require('dotenv').config()
const express = require('express'); 
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/dbConn')
const PORT = process.env.PORT;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/players', require('./routes/playerRoute'));

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})