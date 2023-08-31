const e = require('connect-flash');
const { Sentence } = require('../models');
const { validationResult } = require('express-validator');
const Sequelize = require('sequelize');


module.exports = function(app) {

	this.dashboard = function(req, res) {


		Sentence.findAll().then(function(sentences) {
			// pegar todas as sentenças e agrupar por resultado, fazendo uma contagem e retornar para view
			Sentence.findAll({
				attributes: ['resultado', [Sequelize.fn('COUNT', Sequelize.col('resultado')), 'count']],
				group: ['resultado']
			}).then(function(results) {

				const resultsArray = results.map(function(result) {
					return result.dataValues;
				})
				res.render('dashboard', {sentences: sentences, results: resultsArray});
			})

		})

	}

	this.adicionarView = function(req, res) {
		res.render('adicionar', {errors: []});
	}

	this.editView = function(req, res) {

		Sentence.findOne({
			where: {
				id: req.params.id
			}
		}).then(function(sentence) {
			res.render('editar', {sentence: sentence});
		})
	}

	this.edit = function(req, res) {

		Sentence.update({
			teor: req.body.teor,
			numeroProcesso: req.body.numero_processo,
			julgador: req.body.julgador,
		}, {
			where: {
				id: req.params.id
			}
		}).then(function() {
			req.flash('success', 'Sentença editada com sucesso');
			res.redirect('/editar/' + req.params.id);
		});
		
	}

	this.adicionarSentenca = function(req, res) {

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			req.flash('errors', errors.array());
			res.redirect('adicionar');
		} else {

			req.flash('success', 'Sentença adicionada com sucesso');

			Sentence.create({
				teor: req.body.teor,
				numeroProcesso: req.body.numero_processo,
				julgador: req.body.julgador,
			})

			res.redirect('adicionar');
		}
	}

	this.avaliarView = function(req, res) {

		Sentence.findAll({
			where: {
				resultado: null
			}
		}).then(function(sentences) {
			res.render('avaliar', {sentences: sentences});
		})
	
	}

	this.naoSeAplica = function(req, res) {

		Sentence.update({
			resultado: "nao_se_aplica"
		}, {
			where: {
				id: req.body.id
			}
		}).then(function() {
			res.redirect('back')
		})
	
	}

	this.delete = function(req, res) {

		Sentence.destroy({
			where: {
				id: req.params.id
			}
		}).then(function() {
			res.redirect('back')
		})
	
	}

	this.gostei = function(req, res) {

		Sentence.update({
			resultado: "gostei"
		}, {
			where: {
				id: req.body.id
			}
		}).then(function() {
			res.redirect('back')
		})
		
	}

	this.naoGostei = function(req, res) {

		Sentence.update({
			resultado: "nao_gostei"
		}, {
			where: {
				id: req.body.id
			}
		}).then(function() {
			res.redirect('back')
		})
		
	}

  return this;

}