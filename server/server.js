const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const registerRouter = require('./src/routes/api/registerRouter');
const userRouter = require('./src/routes/api/userRouter');
const orphanageRouter = require('./src/routes/api/orphanageRouter');
const restaurantRouter = require('./src/routes/api/restaurantRouter');
require('dotenv').config();

app.use(express.static('./public'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    console.log("Let's start");
});

app.use('/api/auth',registerRouter);
app.use('/api/user',userRouter);
app.use('/api/orphanage',orphanageRouter);
app.use('/api/rest',restaurantRouter);


mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => {
        
        console.log(`Server is running on ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log('Database Error:', error);
});