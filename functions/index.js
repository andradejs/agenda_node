require('dotenv').config();

const express = require('express');

const app = express();

const mongoose = require('mongoose');

mongoose.connect(process.env.CONECTIONSTRING)
.then(() => {
    app.emit(true) ;
    console.log('conectou com o banco de dados');
})
.catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash')

const routes = require('../routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const {middlewareGlobal,checkCsrfErro,criarTokenCsrf} = require('../src/middlewares/middleware');
const cookieParser = require('cookie-parser');



app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname,'public')));

const confgSession = session({
    secret: 'fdçdjo ois dojosd kgçalsjd 2552547',
    store: new MongoStore({mongoUrl:process.env.CONECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000*60*60*24*7,
        httpOnly: true
    }
});

app.use(confgSession)
app.use(flash())


app.set(`view engine`,'ejs');
app.set(`views`,path.resolve(__dirname,'src','views'));

app.use(cookieParser());
app.use(csrf({cookie:true}));
app.use(criarTokenCsrf);
app.use(checkCsrfErro);
app.use(middlewareGlobal);

app.use(routes);

app.on(true,() =>{
    
    app.listen(3000,()=>{
        console.log('sevidor rodando na porta 3000');
        console.log('Acesse: http://localhost:3000');
    });
})