// const http = require('http');
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');


// const app = express();
// require('dotenv').config();

// const server = http.createServer(app);

// app.use(cors);
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
// const conn = mongoose.connection;
// conn.once('open', () => {
//     console.log("connessione al db")
// })

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// const userRoutes = require('./routes/userRoutes');
// app.use(userRoutes);

// server.listen(process.env.PORT, () => {
//     console.log(`app listening on port ${process.env.PORT}`);
// });

const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());

const server = http.createServer(app);

const dotenv = require('dotenv').config();

//communicate with front-end through json objects
app.use(express.json());

//CORS policy: every domain is allowed FOR NOW
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//database connection
const DBURI = process.env.MONGO_URL;
mongoose.connect(DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const conn = mongoose.connection;
conn.once('open', () => {
    console.log('connessione al db avvenuta');
});

//IMPORT of all the routes
const userRoutes = require('./routes/userRoutes');

//USAGE of all the routes
app.use("/api/auth", userRoutes);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});