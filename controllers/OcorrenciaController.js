const Ocorrencia = require('../models/Ocorrencia');
const { redis } = require('../database/server');

// Criar uma nova ocorr�ncia
module.exports.CreateOcorrencia = async function (req, res) {
    try {
        const novaOcorr = await Ocorrencia.create(req.body);

        // Adicionar a nova ocorr�ncia ao cache da lista de ocorr�ncias
        const ocorrenciasCache = await redis.get('listaOcorrencias');
        if (ocorrenciasCache) {
            const ocorrencias = JSON.parse(ocorrenciasCache);
            ocorrencias.unshift(novaOcorr); // Adiciona no in�cio da lista
            await redis.set('listaOcorrencias', JSON.stringify(ocorrencias), 'EX', 3600);
        }

        res.status(201).send(novaOcorr);
    } catch (error) {
        res.status(400).send(error);
    }
};
// Listar todas as ocorr�ncias
module.exports.ListarOcorrencia = async function (req, res) {
    try {
        const cacheKey = 'listaOcorrencias';
        // Verificar se os dados est�o no cache do Redis
        const cachedOcorrencias = await redis.get(cacheKey);

        if (cachedOcorrencias) {
            // Se os dados est�o no cache, envie-os
            return res.status(200).send(JSON.parse(cachedOcorrencias));
        }

        // Se os dados n�o est�o no cache, busque do MongoDB
        const ocorrencias = await Ocorrencia.find().sort({ data: -1 });

        // Armazenar os dados no cache do Redis
        await redis.set(cacheKey, JSON.stringify(ocorrencias), 'EX', 3600); // Expira em 1 hora

        res.status(200).send(ocorrencias);
    } catch (error) {
        res.status(500).send(error);
    }
};
// Atualizar uma ocorr�ncia
module.exports.AtualizarOcorrencia = async function (req, res) {
    try {
        const ocorrAtualizada = await Ocorrencia.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!ocorrAtualizada) {
            return res.status(404).send();
        }

        // Atualizar a ocorr�ncia espec�fica no cache da lista de ocorr�ncias
        const ocorrenciasCache = await redis.get('listaOcorrencias');
        if (ocorrenciasCache) {
            const ocorrencias = JSON.parse(ocorrenciasCache);
            const index = ocorrencias.findIndex(o => o._id.toString() === req.params.id);
            if (index !== -1) {
                ocorrencias[index] = ocorrAtualizada;
                await redis.set('listaOcorrencias', JSON.stringify(ocorrencias), 'EX', 3600);
            }
        }

        res.send(ocorrAtualizada);
    } catch (error) {
        res.status(400).send(error);
    }
};
// Deletar uma ocorr�ncia
module.exports.DeletarOcorrencia = async function (req, res) {
    try {
        const ocorrDeletada = await Ocorrencia.findByIdAndDelete(req.params.id);
        if (!ocorrDeletada) {
            return res.status(404).send();
        }

        // Remover a ocorr�ncia deletada do cache da lista de ocorr�ncias
        const ocorrenciasCache = await redis.get('listaOcorrencias');
        if (ocorrenciasCache) {
            let ocorrencias = JSON.parse(ocorrenciasCache);
            ocorrencias = ocorrencias.filter(o => o._id.toString() !== req.params.id);
            await redis.set('listaOcorrencias', JSON.stringify(ocorrencias), 'EX', 3600);
        }

        res.send(ocorrDeletada);
    } catch (error) {
        res.status(500).send(error);
    }
};
// Buscar ocorrencia por id
module.exports.GetOcorrenciaById = async function(req, res) {
    try {
        const cacheKey = `ocorrencia:${req.params.id}`;
        const cachedOcorrencia = await redis.get(cacheKey);

        if (cachedOcorrencia) {
            return res.status(200).send(JSON.parse(cachedOcorrencia));
        }

        const ocorrencia = await Ocorrencia.findById(req.params.id);
        if (!ocorrencia) {
            return res.status(404).send('Ocorr�ncia n�o encontrada');
        }

        // Armazenar no cache
        await redis.set(cacheKey, JSON.stringify(ocorrencia), 'EX', 3600);

        res.status(200).send(ocorrencia);
    } catch (error) {
        res.status(500).send(error);
    }
};
