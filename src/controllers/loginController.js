const Login = require('../model/LoginModel');



exports.index = (req, res) => {
   
    if (req.session.user){
        return res.render('login_logado')
    }
    req.session.loginIndex = req.path;
    return res.render('login');
}


exports.login = async (req, res) => {

    try {

        const login = new Login(req.body);
        await login.logar();

        if (login.erros.length > 0) {
            req.flash('erros', login.erros);
            req.session.save(function (){
                return  res.redirect(req.session.loginIndex || '/');
            });
           
            return;
        }

        req.flash('sucessos', 'Você entrou no sistema');
        req.session.user = login.user;
        req.session.save(function (){
            return  res.redirect(req.session.loginIndex || '/');
        });

    } catch (e) {
        console.log(e);
        res.render('404');
    }
}

exports.cadastrar = async (req, res) => {


    
        const login = new Login(req.body);
        await login.cadastrar();
       
        if (login.erros.length > 0) {
            
            req.flash('erros', login.erros);
            req.session.save(function (){
                return  res.redirect(req.session.loginIndex || '/');
            });
            return
        }

        req.flash('sucessos', 'Seu cadastro foi realizado com sucesso');
        req.session.save(function (){
            return  res.redirect(req.session.loginIndex || '/');
        });

   

}

exports.logout = (req,res) =>{
    req.session.destroy();
    res.redirect('/')
};