document.addEventListener('DOMContentLoaded', function() {
    fetchOcorrencias();

    function fetchOcorrencias() {
        fetch('/ocorrencias')
        .then(response => response.json())
        .then(data => {
            displayOcorrencias(data);
        })
        .catch(error => {
            console.error('Erro ao buscar ocorrencias:', error);
        });
    }

    function displayOcorrencias(ocorrencias) {
        const listaOcorrencias = document.getElementById('listaOcorrencias');
        listaOcorrencias.innerHTML = '';

        ocorrencias.forEach(ocorrencia => {
            const div = document.createElement('div');
            div.classList.add('ocorrencia');
            
            div.innerHTML = `
                <h4>${ocorrencia.titulo}</h4>
                <p>Tipo: ${ocorrencia.tipo}</p>
                <p>Data: ${ocorrencia.data}</p>
                <p>Hora: ${ocorrencia.hora}</p>
                <p>Localização: Latitude ${ocorrencia.localizacao.coordinates[1]}, Longitude ${ocorrencia.localizacao.coordinates[0]}</p>
                <button onclick="atualizarOcorrencia('${ocorrencia._id}')">Atualizar</button>
            `;
            listaOcorrencias.appendChild(div);
        });
    }
});

function atualizarOcorrencia(id) {
    // Redireciona para a página de atualização com o ID da ocorrência
    window.location.href = `/ajustar.html?id=${id}`;
}
