const Ocorrencia = require('../models/Ocorrencia');

// Criar uma nova ocorrência
module.exports.CreateOcorrencia = async function (req, res) {
    try {
        const ocorr = await Ocorrencia.create(req.body);
        res.status(201).send(ocorr);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Listar todas as ocorrências
module.exports.ListarOcorrencia = async function (req, res) {
    try {
        const ocorrencias = await Ocorrencia.find().sort({ data: -1 });
        res.status(200).send(ocorrencias);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Atualizar uma ocorrência
module.exports.AtualizarOcorrencia = async function (req, res) {
    try {
        const ocorr = await Ocorrencia.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!ocorr) {
            return res.status(404).send();
        }
        res.send(ocorr);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Deletar uma ocorrência
module.exports.DeletarOcorrencia = async function (req, res) {
    try {
        const ocorr = await Ocorrencia.findByIdAndDelete(req.params.id);
        if (!ocorr) {
            return res.status(404).send();
        }
        res.send(ocorr);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports.GetOcorrenciaById = async function(req, res) {
    try {
        const ocorrencia = await Ocorrencia.findById(req.params.id);
        if (!ocorrencia) {
            return res.status(404).send('Ocorrência não encontrada');
        }
        res.status(200).send(ocorrencia);
    } catch (error) {
        res.status(500).send(error);
    }
};