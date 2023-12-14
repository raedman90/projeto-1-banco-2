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
                <div id="map-${ocorrencia._id}" class="mini-map"></div>
                <button onclick="removerOcorrencia('${ocorrencia._id}')">Remover</button>
            `;
            listaOcorrencias.appendChild(div);
    
            initMiniMap(ocorrencia._id, ocorrencia.localizacao.coordinates);
        });
    }    
});

function removerOcorrencia(id) {
    if (confirm('Tem certeza que deseja remover esta ocorrência?')) {
        fetch(`/ocorrencias/${id}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                alert('Ocorrencia removida com sucesso!');
                window.location.reload();
            } else {
                alert('Erro ao remover ocorrência.');
            }
        })
        .catch(error => {
            console.error('Erro ao remover ocorrência:', error);
        });
    }
}

function initMiniMap(id, coordinates) {
    const map = new google.maps.Map(document.getElementById(`map-${id}`), {
        center: { lat: coordinates[1], lng: coordinates[0] },
        zoom: 15
    });
    new google.maps.Marker({
        position: { lat: coordinates[1], lng: coordinates[0] },
        map: map
    });
}
