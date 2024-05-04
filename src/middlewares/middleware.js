

exports.checkCsrfErro = (err, req, res, next) =>{
    
    if(err){
        console.log('404');
        return res.render('404');
    }
    next();
}


exports.criarTokenCsrf = (err,req,res,next) =>{
    res.locals.csrfToken = req.csrfToken();
    next();
}


exports.middlewareGlobal = (req,res,next) =>{
    res.locals.erros= req.flash('erros');
    res.locals.sucessos = req.flash('sucessos');
    res.locals.user = req.session.user;
    next();
}


exports.checaSession = (req,res,next) =>{

    if (!req.session.user){
        req.flash('erros','Voce precisa está logado para entrar nessa página');
        req.session.save( ()=>{res.redirect('/')})
        return;
    }
    next();
}