require('dotenv').config();

const massive = require('massive')
const session = require('express-session')

const express = require('express'),
      userCtrl = require('./controllers/user'),
      postCtrl = require('./controllers/posts')

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express();
app.use(express.json());
app.use(session( {
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}))


massive ({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then((db) => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`we are connected to port: ${SERVER_PORT}`))
}).catch((err) => console.log(err))

//Auth Endpoints
app.post('/api/auth/register', userCtrl.register); //passed
app.post('/api/auth/login', userCtrl.login); //passed
app.get('/api/auth/me', userCtrl.getUser); //passed
app.post('/api/auth/logout', userCtrl.logout);//passed

// //Post Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);// status 500
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost)

// app.listen(4000, _ => console.log(`running on ${4000}`));