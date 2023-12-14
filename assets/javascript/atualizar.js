document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const ocorrenciaId = params.get('id');
    if (ocorrenciaId) {
        fetch(`/ocorrencias/${ocorrenciaId}`)
        .then(response => response.json())
        .then(ocorrencia => {
            document.getElementById('titulo').value = ocorrencia.titulo;
            document.getElementById('tipo').value = ocorrencia.tipo;
            document.getElementById('data').value = ocorrencia.data;
            document.getElementById('hora').value = ocorrencia.hora;
            document.getElementById('ocorrenciaId').value = ocorrenciaId;
        })
        .catch(error => {
            console.error('Erro ao carregar ocorrencia:', error);
        });
    }

    document.getElementById('formAtualizarOcorrencia').addEventListener('submit', function(e) {
        e.preventDefault();
        const ocorrenciaId = document.getElementById('ocorrenciaId').value;
        const data = {
            titulo: document.getElementById('titulo').value,
            tipo: document.getElementById('tipo').value,
            data: document.getElementById('data').value,
            hora: document.getElementById('hora').value,
        };
        fetch(`/ocorrencias/${ocorrenciaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            alert('Ocorrencia atualizada com sucesso!');
            window.location.href = '/atualizar.html';
        })
        .catch(error => {
            console.error('Erro ao atualizar ocorrencia:', error);
            alert('Erro ao atualizar ocorrência.');
        });
    });
});
