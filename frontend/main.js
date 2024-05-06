import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/css/style.css';


import Login from "./modules/Login"
import Contato from "./modules/Contatos"

const login = new Login(".form-login")
const cadastro = new Login(".form-cadastro")

const contato = new Contato(".form-contatos")

cadastro.init()
login.init()

contato.init()