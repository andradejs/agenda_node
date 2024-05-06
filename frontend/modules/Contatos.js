import validator from "validator"


export default class Contato{


    constructor(className){

        this.form = document.querySelector(className)


    }


    init(){
        this.event()
    }


    event(){

        this.form.addEventListener('submit',e=>{
            e.preventDefault()
            this.validarContato(e)

        })

    }

    validarContato(e){

        const elemento = e.target
        this.cleanErro()
        const listaCampos = elemento.querySelectorAll('input')
        const campoEmail = elemento.querySelector('input[name="email"]')
        let erro = false;

        for (let input of listaCampos){
            if (!input.value){
                this.criarErro(input,`O campo ${input.name} não deve estar vazio`);
                erro = true;
            }
        }
        if (!validator.isEmail(campoEmail.value)){
            this.criarErro(campoEmail,'Email inválido')
            erro = true
        }

        if(!erro){
            elemento.submit()
        }
    }
    


    criarErro(campo, msg){

        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('text-erro');
        campo.insertAdjacentElement('afterend',div);
    }

    cleanErro(){

        const listaErro = this.form.querySelectorAll('.text-erro');

        for (let erro of listaErro){
            erro.innerHTML = ''
        }
    }
}
