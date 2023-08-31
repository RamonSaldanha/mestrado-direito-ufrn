const e = require('connect-flash');
const { Reclamacoes, ReclamacoesPorAssunto, ReclamacaoPorAssuntoLegislacao, Legislacao, sequelize } = require('../models');
const { validationResult } = require('express-validator');
const Sequelize = require('sequelize');
const multer = require('multer');
const path = require('path');
const csvtojson = require('csvtojson');
const xlsx = require('xlsx');
var moment = require('moment');
const { Op } = require('sequelize');

// Configurando a pasta onde os arquivos serão armazenados
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});


module.exports = function(app) {
	
	this.artigosMaisFrequentes = async function(req, res) {

		const result = await sequelize.query(`
    SELECT l.artigo, SUM(r.qtd) as total
    FROM reclamacaoporassuntolegislacaos as rl
    JOIN reclamacoesporassuntos as r ON r.id = rl.reclamacaoPorAssuntoId
    JOIN legislacaos as l ON l.id = rl.legislacaoId
    GROUP BY l.artigo
    ORDER BY total DESC
  	`, { type: Sequelize.QueryTypes.SELECT });

  	res.render('artigos-mais-frequentes', {result});
	}

	this.reclamacoesPorAssuntoLegislacaoView = async function(req, res) {

		try {
			const reclamacoes = await ReclamacoesPorAssunto.findAll({
				where: {
					not: { concluido: true } // apenas reclamações com status diferente de "1"
				},
				include: [{
					model: Legislacao,
					through: { attributes: [] } // isso evitará que os dados da tabela de junção sejam retornados
				}]
			});
	
			res.json(reclamacoes);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Ocorreu um erro ao buscar as reclamações.' });
		}

	}

	this.associacaoView = async function(req, res) {
		const legislacoes = await Legislacao.findAll();
		const reclamacoes = await ReclamacoesPorAssunto.findAll();
	
		res.render('associar-reclamacao-legislacao', {
			legislacoes,
			reclamacoes
		});
	}

	this.desassociar = async function(req, res) {
		const { reclamacaoId, legislacaoId } = req.params;

		const reclamacao = await ReclamacoesPorAssunto.findByPk(reclamacaoId);
		const legislacao = await Legislacao.findByPk(legislacaoId);
	
		await reclamacao.removeLegislacao(legislacao);
	
		res.redirect('/visualizar-editar-reclamacoes');
	}

	this.associar = async function(req, res) {
		const { reclamacaoId, legislacaoId } = req.body;

		const reclamacao = await ReclamacoesPorAssunto.findByPk(reclamacaoId);
		const legislacao = await Legislacao.findByPk(legislacaoId);
	
		await reclamacao.addLegislacao(legislacao);
	
		res.redirect('/visualizar-editar-reclamacoes');
	}

	this.concluirReclamacao = async function(req, res) {
		const { reclamacaoId } = req.params;
		
		const reclamacao = await ReclamacoesPorAssunto.findByPk(reclamacaoId);

		await reclamacao.update({
			concluido: true
		});

		res.redirect('/visualizar-editar-reclamacoes');
		
	}

	this.visualizarReclamacoes = async function(req, res) {
		
		const reclamacoes = await ReclamacoesPorAssunto.findAll({

			where: {
				concluido: true
			},

			include: [{
				model: Legislacao,
				through: { attributes: [] } // isso evitará que os dados da tabela de junção sejam retornados
			}],

			order: [
				['qtd', 'DESC']
			]
		});
		// const legislacoes = await Legislacao.findAll();
		const totalReclamacoes = await ReclamacoesPorAssunto.count({
			where: {
				concluido: true
			}
		});

		res.render('visualizar-reclamacoes', {
			reclamacoes,
			totalReclamacoes
		});	
	}

	this.visualizarEditarReclamacoes = async function(req, res) {

		const reclamacoes = await ReclamacoesPorAssunto.findOne({

			where: {
				concluido: {
					[Op.not]: true
				}
			},

			include: [{
				model: Legislacao,
				through: { attributes: [] } // isso evitará que os dados da tabela de junção sejam retornados
			}],

			order: [
				['qtd', 'DESC']
			]
		});

		const legislacoes = await Legislacao.findAll();
	
		res.render('visualizar-editar-reclamacoes', {
			reclamacoes,
			legislacoes
		});
	}


	this.home = function(req, res) {
		// pegar contagem de todas as reclamações e retornar para view
		res.render('reclamacoes', {errors: [], resultado: []});
	}
	
	this.statistics = async function(req, res) {
		// agrupar reclamações por problema e colocar em uma variavel
		const count = await Reclamacoes.count();

		res.render('reclamacoesEstatisticas', {reclamacoesCount: count});
	}

	// crie um método para pegar todos os problemas e retornar e json
	this.getProblemas = async function(req, res) {
		const reclamacoesPorAssunto = await ReclamacoesPorAssunto.findAll();

		res.json(reclamacoesPorAssunto);
	}

	this.getComoComprou = async function(req, res) {
		const comoComprou = await Reclamacoes.findAll({
			attributes: ['comoComprContratou', [Sequelize.fn('COUNT', Sequelize.col('comoComprContratou')), 'count']],
			group: ['comoComprContratou']
		});

		res.json(comoComprou);
	}
	

	this.upload = function(req, res) {
		const upload = multer({
			storage: storage
		}).single('file');

		upload(req, res, async (err) => {
			if (err) {
				res.render('error', { message: err.message });
			} else {
				// Arquivo enviado com sucesso
				const file = req.file;
	
				// Lendo o arquivo Excel
				const workbook = xlsx.readFile(file.path, { cellDates: true });
	
				// Obtendo o nome da primeira planilha
				const sheetName = workbook.SheetNames[0];
	
				// Obtendo os dados da primeira planilha como uma matriz de objetos
				const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

				Reclamacoes.bulkCreate(sheetData).then(() => {
					res.send('Arquivo importado com sucesso');
				}).catch((err) => {
					console.error(err);
					res.status(500).send('Erro ao importar arquivo');
				});

			}
		});
	}
	
  return this;

}