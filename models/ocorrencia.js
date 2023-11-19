const mongoose = require('mongoose');

const ocorrenciaSchema = new mongoose.Schema({
    titulo: String,
    tipo: String,
    data: Date,
    hora: String,
    localizacao: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }
    }
});

// Para indexar a localização para consultas geoespaciais
ocorrenciaSchema.index({ localizacao: '2dsphere' });

const Ocorrencia = mongoose.model('Ocorrencia', ocorrenciaSchema);

module.exports = Ocorrencia;
