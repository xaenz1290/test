const express = require('express')
const parser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const port = process.env.PORT || 8000;
const app = express();

const sessionConfig = {
    secret: 'SessionSecret',
    resave: false,
    saveUninitialized: true,
    name: 'session',
    rolling: true,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 3600000
    }
};

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use(session(sessionConfig));
app.use(cookieParser('asdkjldfjksnasudfh'));
app.use(express.static(path.join(__dirname, 'dist')));

require('./server/config/database');

app.use('/api/items', require('./server/config/routes/item.routes'));
app.use('/api/auth', require('./server/config/routes/auth.routes'));


app.use(require('./server/config/routes/catch-all.routes'));

app.listen(port, () => console.log(`listening on port ${ port }`));
