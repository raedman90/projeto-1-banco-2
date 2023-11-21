let map;

function initMap() {
    const urlParams = new URLSearchParams(window.location.search);
    const ocorrenciaId = urlParams.get('id');

    fetch(`/ocorrencias/${ocorrenciaId}`)
    .then(response => response.json())
    .then(ocorrencia => {
        const ocorrenciaLocation = {
            lat: ocorrencia.localizacao.coordinates[1], 
            lng: ocorrencia.localizacao.coordinates[0]
        };

        map = new google.maps.Map(document.getElementById("map"), {
            center: ocorrenciaLocation, 
            zoom: 14,
        });

        const ocorrenciaMarker = new google.maps.Marker({
            position: ocorrenciaLocation,
            map: map,
            icon: 'https://i.imgur.com/bCZsADz.png',
            title: ocorrencia.titulo
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <strong>Título:</strong> ${ocorrencia.titulo}<br>
                <strong>Tipo:</strong> ${ocorrencia.tipo}<br>
                <strong>Data:</strong> ${ocorrencia.data}<br>
                <strong>Hora:</strong> ${ocorrencia.hora}<br>
            `
        });

        ocorrenciaMarker.addListener('click', function() {
            infoWindow.open(map, ocorrenciaMarker);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar ocorrencia:', error);
    });
}
