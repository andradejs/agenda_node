const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')


// rotas pagina inicial
route.get('/',homeController.index);




// rotas pagina de login

route.get('/login/index',loginController.index);
route.post('/login/cadastrar',loginController.cadastrar);
route.post('/login/login',loginController.login);

module.exports = route;