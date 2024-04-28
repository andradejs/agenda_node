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


const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const {middlewareGlobal,checkCsrfErro,criarTokenCsrf} = require('./src/middlewares/middleware');
const cookieParser = require('cookie-parser');

app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname,'public')));
app.set(`views`,path.resolve(__dirname,'src','views'));
app.set(`view engine`,'ejs');

app.use(cookieParser())
app.use(csrf({cookie:true}));
app.use(criarTokenCsrf);
app.use(checkCsrfErro);
app.use(middlewareGlobal)

app.use(routes);

app.on(true,() =>{
    
    app.listen(3000,()=>{
        console.log('sevidor rodando na porta 3000');
        console.log('Acesse: http://localhost:3000');
    });
})