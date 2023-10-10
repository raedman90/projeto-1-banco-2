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

    google.maps.event.addListener(marker, 'dragend', function(event) {
        document.getElementById('latitude').value = event.latLng.lat();
        document.getElementById('longitude').value = event.latLng.lng();
    });
}

function placeMarker(location) {
    marker.setPosition(location);
    document.getElementById('latitude').value = location.lat();
    document.getElementById('longitude').value = location.lng();
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
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao cadastrar ocorrencia.');
    });
});




});