const Contato = require('../model/ContatosModel')

exports.index = (req, res) => {

    req.session.contatoIndex = req.path;
    res.render('contatos',{contato: {}});

}


exports.criar = async (req, res) => {


    try {
        
        const contato = new Contato(req.body);
    
        await contato.criar();
    
        if (contato.erros.length > 0) {
            req.flash('erros', contato.erros);
            req.session.save(function () {
                return res.redirect(req.session.contatoIndex || '/');
            });
    
            return;
        }
    
        req.flash('sucessos', 'Contato criado');
        req.session.save(() => res.redirect(`/contatos/index/${contato.contato._id}`));
        return;
    } catch (error) {
    
        console.log(error);
        return res.render('404');
    }

}

exports.editeIndex =  async(req,res) =>{


    if (!req.params.id) return res.render('404');

    const contato = await Contato.buscarPorId(req.params.id);

    if (!contato) return res.render('404');

    res.render('contatos',{contato})
    
}