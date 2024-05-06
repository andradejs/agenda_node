import validator from "validator";


export default class Login{

    constructor(className){
        
        this.form = document.querySelector(className);
        
    }
    
    init(){
        
        this.events();
    }
    
    events(){
        
        
        if (!this.form) return;
        this.form.addEventListener('submit',e=>{
            
            e.preventDefault();
            this.validate(e);
        });
    }
    
    validate(e){
        
        this.clienError();
        const elemento = e.target;

        const campoEmail = elemento.querySelector('input[name="email"]');
        const campoSenha = elemento.querySelector('input[name="senha"]');

        const valueEmail = campoEmail.value;
        const valueSenha = campoSenha.value;

        let erro = false;

        if (!validator.isEmail(valueEmail)){
            this.criaErro(campoEmail,'Email inválido');
            erro = true;
        }
        if (valueSenha.length < 3 || valueSenha.length > 50){
            this.criaErro(campoSenha,'A senha deve ter entre 3 e 50 caracteres');
            erro = true;
        }

        if(!erro){
            elemento.submit();
        }


    }

    criaErro(campo,msg){


        const div = document.createElement('div');

        div.innerHTML = msg;
        div.classList.add('text-erro');
        campo.insertAdjacentElement('afterend',div);

    }

    clienError(){
        for (let elemento of this.form.querySelectorAll('.text-erro')){
            elemento.innerHTML = ''
        }
    }
}