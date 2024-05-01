const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const LoignSchema = new mongoose.Schema({
    email: { type: String, required: true },
    senha: { type: String, required: true },


});

const LoginModel = mongoose.model('model',LoignSchema);

class Login {

    constructor(body) {

        this.body = body;
        this.erros = [];
        this.user = null
    }

    async cadastrar() {

        this.validar()

        if (this.erros.length > 0) return;

        await this.isUserExistente()

        if (this.erros.length > 0) return;

        try{
            const salt = bcryptjs.genSaltSync();
            this.body.senha = bcryptjs.hashSync(this.body.senha, salt)
            this.user = await LoginModel.create(this.body)
        }catch(e){
            console.log(e)
        }
    }

    async isUserExistente(){

        const user = await LoginModel.findOne({ email:this.body.email});
        
        if (user){
            this.erros.push('Usuario já existe')
        }
    }

    validar() {

        this.clienUp()
        //se email é invalido

        if (!validator.isEmail(this.body.email)){
            this.erros.push('Email inválido')
        }
        if (this.body.senha.length < 3 || this.body.senha.length > 50){
            this.erros.push('A senha deve ter entre 3 á 50 caracteres')
            
        }
        
    }

    clienUp(){
        
        for (const key in this.body){

            if (typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
        }
        this.body = {
            email:this.body.email,
            senha: this.body.senha
        }

    }
}

module.exports = Login;