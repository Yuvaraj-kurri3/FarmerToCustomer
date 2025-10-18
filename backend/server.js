const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');
const connectDB = require('./config/db');
const mongooseSession = require('connect-mongodb-session')(session);
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/UserRoute');
const FarmerRoutes = require('./routes/FarmerRoute');
const app = express();

dotenv.config({path: path.join(__dirname, '../.env')});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
 
const PORT = process.env.PORT || 3000;

console.log('MONGODB_URI=', process.env.MONGODB_URI.replace(/\/\/.*@/, '//***:***@'));

connectDB();


// create session store using connect-mongo
const store = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,
  collectionName: 'mysessions',
  mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
});

app.use(session({
  secret: 'F2C', // change this to a strong secret
  resave: false,
  saveUninitialized: false,
  store: store, // Use MongoDB session store
  cookie: {
    secure: false, // set to true when using HTTPS in production
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

app.use('/api/auth', authRoutes);
app.use('/api/farmer', FarmerRoutes);

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});