const Contato = require('../model/ContatosModel')


exports.index = async (req, res) => {

    
    const contatos = await Contato.buscarTodosContatos();

    res.render('index',{contatos});
}