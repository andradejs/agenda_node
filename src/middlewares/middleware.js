

exports.checkCsrfErro = (err, req, res, next) =>{
    console.log('passou pela checagem')
    if(err){
        console.log('404')
        return res.render('404');
    }
    next()
}


exports.criarTokenCsrf = (err,req,res,next) =>{
    res.locals.csrfToken = req.csrfToken();
    next();
}


exports.middlewareGlobal = (req,res,next) =>{
    res.locals.erros= req.flash('erros');
    res.locals.sucessos = req.flash('sucessos')
    next()
}