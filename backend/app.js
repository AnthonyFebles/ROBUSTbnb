const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes')


const { enviorment } = require('./config');
//Create a variable called isProduction 
//that will be true if the environment is in production or not 
const isProduction = enviorment === 'production'

const app = express()

app.use(morgan('dev'))
//Add the cookie-parser middleware for parsing cookies
app.use(cookieParser())
app.use(express.json())


if(!isProduction) {
    //enable cors only in development 
    app.use(cors())
}




app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
)

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
)

app.use(routes)






module.exports = app