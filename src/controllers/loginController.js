const Login = require('../model/LoginModel');



exports.index = (req,res) =>{
    req.session.redirectTo = req.path;
    res.render('login');
}


exports.login = (req,res) =>{
    res.redirect('back');
}

exports.cadastrar = async (req,res)=>{
    try {
        const login = new Login(req.body);
        await login.cadastrar();

        if (login.erros.length > 0){
            req.flash('erros',login.erros)
            await req.session.save()
            res.redirect(req.session.redirectTo || '/')
            return;
        }

        req.flash('sucessos','Seu cadastro foi realizado com sucesso')
        await req.session.save()
        return res.redirect(req.session.redirectTo || '/')
        
    } catch (e) {
        console.log(e)
        res.render('404')
    }


}