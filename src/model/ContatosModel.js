const mongoose = require('mongoose');
const validator = require('validator');
const ContatoSchema = new mongoose.Schema({

    nome: { type: String, required: true },
    sobrenome: { type: String, required: false , default: '' },
    email: { type: String, required: false , default: '' },
    telefone: { type: String, required: false , default: '' },
    criadoEm: { type:Date , default: Date.now},

});

const ContatoModel = mongoose.model('Contato', ContatoSchema);



function Contato(body){

       this.body = body;
       this.erros = [];
       this.contato = null;
    

}

Contato.buscarPorId = async function(id){

    if (typeof id !== 'string') return;

    const user = await ContatoModel.findById(id);

    return user;
}


Contato.prototype.criar = async function(){

    this.valida();

    if (this.erros.length > 0) return;
    this.contato = await ContatoModel.create(this.body);
   
}

Contato.prototype.valida = function(){

    this.cleanUp();

    if (this.body.email && !validator.isEmail(this.body.email)) this.erros.push('Email invalido');
    if (!this.body.nome) this.erros.push('Você precisa registrar um nome');
    if (!this.body.email && !this.body.telefone) this.erros.push('Você precisa colocar ou um Email ou um telefone');


}

Contato.prototype.cleanUp = function(){

    for (const key in this.body){

        if(typeof this.body[key] !== "string"){
            this.body[key] = "";
        }
    }

    this.body = {

        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone,

    }
}

module.exports = Contato;