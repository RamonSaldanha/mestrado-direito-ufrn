const { ReclamacoesPorAssunto, Legislacao, Sentence } = require('../models');


module.exports = function(app){

  this.showAddArtigoForm = function(req, res) {
    res.render('addArtigo');
  }

  this.addArtigo = async (req, res) => {
    try {
        const { artigo, lei } = req.body;
        await Legislacao.create({ artigo, lei });
			  req.flash('success', 'Artigo adicionada com sucesso');
        res.redirect('/legislacao-adicionar-artigos'); // Redirecionar para a lista de artigos após adicionar
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro ao adicionar o artigo');
    }
  }

  return this;

}
