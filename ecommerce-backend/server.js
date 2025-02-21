const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./productRoutes');
require('dotenv').config();

const app = express();

app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(("mongodb://127.0.0.1:27017/CONTACT"))
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

    app.use('/api', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});  