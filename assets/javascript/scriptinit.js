let marker;
let map;
let center = {lat: -6.890648554218208, lng: -38.554989416685295}; // Cajazeiras

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: center, 
        zoom: 14,
    });
    // Carregar ocorrências ao iniciar o mapa
    displayOcorrencias();
}

function displayOcorrencias() {
    fetch('/ocorrencias')
    .then(response => response.json())
    .then(data => {
        data.forEach(ocorrencia => {
            let ocorrenciaMarker = new google.maps.Marker({
                position: {
                    lat: ocorrencia.localizacao.coordinates[1], 
                    lng: ocorrencia.localizacao.coordinates[0]
                },
                map: map,
                icon: 'https://i.imgur.com/bCZsADz.png',
                title: ocorrencia.titulo
            });

            let infoWindow = new google.maps.InfoWindow({
                content: `
                    <strong>Titulo:</strong> ${ocorrencia.titulo}<br>
                    <strong>Tipo:</strong> ${ocorrencia.tipo}<br>
                    <strong>Data:</strong> ${ocorrencia.data}<br>
                    <strong>Hora:</strong> ${ocorrencia.hora}<br>
                `
            });

            ocorrenciaMarker.addListener('click', function() {
                infoWindow.open(map, ocorrenciaMarker);
            });
        });
    })
    .catch(error => {
        console.error('Erro ao buscar ocorrencias:', error);
    });
}