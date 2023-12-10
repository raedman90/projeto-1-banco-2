const Ocorrencia = require('../models/Ocorrencia');
const { redis } = require('../database/server');

// Criar uma nova ocorrência
module.exports.CreateOcorrencia = async function (req, res) {
    try {
        const novaOcorr = await Ocorrencia.create(req.body);

        // Adicionar a nova ocorrência ao cache da lista de ocorrências
        const ocorrenciasCache = await redis.get('listaOcorrencias');
        if (ocorrenciasCache) {
            const ocorrencias = JSON.parse(ocorrenciasCache);
            ocorrencias.unshift(novaOcorr); // Adiciona no início da lista
            await redis.set('listaOcorrencias', JSON.stringify(ocorrencias), 'EX', 3600);
        }

        res.status(201).send(novaOcorr);
    } catch (error) {
        res.status(400).send(error);
    }
};
// Listar todas as ocorrências
module.exports.ListarOcorrencia = async function (req, res) {
    try {
        const cacheKey = 'listaOcorrencias';
        // Verificar se os dados estão no cache do Redis
        const cachedOcorrencias = await redis.get(cacheKey);

        if (cachedOcorrencias) {
            // Se os dados estão no cache, envie-os
            return res.status(200).send(JSON.parse(cachedOcorrencias));
        }

        // Se os dados não estão no cache, busque do MongoDB
        const ocorrencias = await Ocorrencia.find().sort({ data: -1 });

        // Armazenar os dados no cache do Redis
        await redis.set(cacheKey, JSON.stringify(ocorrencias), 'EX', 3600); // Expira em 1 hora

        res.status(200).send(ocorrencias);
    } catch (error) {
        res.status(500).send(error);
    }
};
// Atualizar uma ocorrência
module.exports.AtualizarOcorrencia = async function (req, res) {
    try {
        const ocorrAtualizada = await Ocorrencia.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!ocorrAtualizada) {
            return res.status(404).send();
        }

        // Atualizar a ocorrência específica no cache da lista de ocorrências
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
// Deletar uma ocorrência
module.exports.DeletarOcorrencia = async function (req, res) {
    try {
        const ocorrDeletada = await Ocorrencia.findByIdAndDelete(req.params.id);
        if (!ocorrDeletada) {
            return res.status(404).send();
        }

        // Remover a ocorrência deletada do cache da lista de ocorrências
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
            return res.status(404).send('Ocorrência não encontrada');
        }

        // Armazenar no cache
        await redis.set(cacheKey, JSON.stringify(ocorrencia), 'EX', 3600);

        res.status(200).send(ocorrencia);
    } catch (error) {
        res.status(500).send(error);
    }
};
