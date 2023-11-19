let marker;
let map;
let center = {lat: -6.890648554218208, lng: -38.554989416685295}; // Cajazeiras

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: center, 
        zoom: 14,
    });
    marker = new google.maps.Marker({
        position: center,
        map: map,
        draggable: true
    });

    // Carregar ocorrências ao iniciar o mapa
    displayOcorrencias();

    // Atualizar campos de latitude e longitude ao arrastar o marcador
    google.maps.event.addListener(marker, 'dragend', function(event) {
        document.getElementById('latitude').value = event.latLng.lat();
        document.getElementById('longitude').value = event.latLng.lng();
    });
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

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formOcorrencia').addEventListener('submit', function(e) {
        e.preventDefault();

        const data = {
            titulo: document.getElementById('titulo').value,
            tipo: document.getElementById('tipo').value,
            data: document.getElementById('data').value,
            hora: document.getElementById('hora').value,
            localizacao: {
                type: "Point",
                coordinates: [
                    parseFloat(document.getElementById('longitude').value),
                    parseFloat(document.getElementById('latitude').value)
                ]
            }
        };

        fetch('/ocorrencias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            alert('Ocorrencia cadastrada com sucesso!');
            window.location.reload(); // Recarrega a página para atualizar o mapa
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao cadastrar ocorrencia.');
        });
    });
});
