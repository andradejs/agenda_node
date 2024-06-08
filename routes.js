const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const contatosController = require("./src/controllers/contatosController");

const { checaSession } = require("./src/middlewares/middleware");

// rotas pagina inicial
route.get("/", homeController.index);

// rotas pagina de login

route.get("/login/index", loginController.index);
route.post("/login/cadastrar", loginController.cadastrar);
route.post("/login/login", loginController.login);
route.get("/login/logout", loginController.logout);

//rotas de contatos

route.get("/contatos/index", checaSession, contatosController.index);
route.get("/contatos/index/:id", checaSession, contatosController.editeIndex);
route.post("/contatos/criar", checaSession, contatosController.criar);
route.post("/contatos/editar/:id", checaSession, contatosController.editar);
route.get("/contatos/deletar/:id", checaSession, contatosController.deletar);

module.exports = route;
