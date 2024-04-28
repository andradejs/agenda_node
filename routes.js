const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')


// rotas pagina inicial
route.get('/',homeController.index);




// rotas pagina de login

route.get('/login',loginController.index);
route.post('/login/cadastrar',(req,res) =>{
    res.send()
});

module.exports = route;