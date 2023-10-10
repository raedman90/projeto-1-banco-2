const Ocorrencia = require('../models/Ocorrencia');

module.exports.CreateOcorrencia = async function (req, res){
    try {
        const ocorr = await Ocorrencia.create(req.body);
        res.status(201).send(ocorr);
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports.ListarOcorrencia = async function (req, res){
    try {
        const ocorrencias = await Ocorrencia.findAll();
        res.status(200).send(ocorrencias);
    } catch (error) {
        res.status(500).send(error);
    }
};