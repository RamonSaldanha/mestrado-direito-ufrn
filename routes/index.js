
module.exports = function(app){
  const { check } = require('express-validator');
	
  app.get('/', app.controllers.HomeController.dashboard);

  app.get('/adicionar', app.controllers.HomeController.adicionarView);
  app.post('/adicionar-sentencas', [
    check('numero_processo').not().isEmpty().withMessage('Número do processo é obrigatório'),
    check('teor').not().isEmpty().withMessage('O campo teor é obrigatório'),
    check('julgador').not().isEmpty().withMessage('O campo julgador é obrigatório'),
  ], app.controllers.HomeController.adicionarSentenca);
  app.get('/avaliar', app.controllers.HomeController.avaliarView);
  
  app.get('/editar/:id', app.controllers.HomeController.editView);
  app.post('/editar/:id', app.controllers.HomeController.edit);

  app.get('/delete/:id', app.controllers.HomeController.delete);

  app.post('/gostei', app.controllers.HomeController.gostei);
  app.post('/nao-gostei', app.controllers.HomeController.naoGostei);
  app.post('/nao-se-aplica', app.controllers.HomeController.naoSeAplica);

  app.get('/reclamacoes', app.controllers.ReclamacoesController.home);
  app.get('/reclamacoes-estatisticas', app.controllers.ReclamacoesController.statistics);
  app.post('/reclamacoes', app.controllers.ReclamacoesController.upload);


  app.get('/get-problemas', app.controllers.ReclamacoesController.getProblemas);
  app.get('/get-como-comprou', app.controllers.ReclamacoesController.getComoComprou);
  
  app.get('/legislacao-adicionar-artigos', app.controllers.LegislacaoController.showAddArtigoForm);
  app.post('/adicionar-legislacao-artigos', app.controllers.LegislacaoController.addArtigo);

  app.get('/reclamacoes-artigos', app.controllers.ReclamacoesController.reclamacoesPorAssuntoLegislacaoView);

  app.get('/associar-reclamacao-legislacao', app.controllers.ReclamacoesController.associacaoView);
  app.post('/associar-reclamacao-legislacao', app.controllers.ReclamacoesController.associar);
  app.get('/visualizar-editar-reclamacoes', app.controllers.ReclamacoesController.visualizarEditarReclamacoes);
  app.post('/reclamacao/:reclamacaoId/legislacao/:legislacaoId', app.controllers.ReclamacoesController.desassociar);
  app.get('/reclamacao/:reclamacaoId/concluir', app.controllers.ReclamacoesController.concluirReclamacao);

  app.get('/visualizar-reclamacoes', app.controllers.ReclamacoesController.visualizarReclamacoes);
  app.get('/artigos-mais-frequentes', app.controllers.ReclamacoesController.artigosMaisFrequentes);
  // app.post('/ia/associar', app.controllers.IAController.associar);
  // app.post('/ia/treinar', app.controllers.IAController.treinar);
};