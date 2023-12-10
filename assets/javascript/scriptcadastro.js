let marker;
let map;

function initMap() {
    // Verificar se a geolocaliza??o est? dispon?vel
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            // Atualizar os campos de latitude e longitude
            document.getElementById('latitude').value = userLocation.lat;
            document.getElementById('longitude').value = userLocation.lng;

            map = new google.maps.Map(document.getElementById("map"), {
                center: userLocation, 
                zoom: 14,
            });

            marker = new google.maps.Marker({
                position: userLocation,
                map: map,
                draggable: true
            });

            // Atualizar campos de latitude e longitude ao arrastar o marcador
            google.maps.event.addListener(marker, 'dragend', function(event) {
                document.getElementById('latitude').value = event.latLng.lat();
                document.getElementById('longitude').value = event.latLng.lng();
            });

        }, function() {
            // Fun??o de callback para lidar com erros
            handleLocationError(true, map.getCenter());
        });
    } else {
        // O navegador n?o suporta Geolocaliza??o
        handleLocationError(false, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, pos) {
    // Aqui voc? pode adicionar um alerta ou uma l?gica para lidar com o erro
    console.log(browserHasGeolocation ?
                'Erro: A Geolocaliza??o falhou.' :
                'Erro: Seu navegador n?o suporta geolocaliza??o.');
}


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formOcorrencia').addEventListener('submit', function(e) {
        e.preventDefault();

        // Coleta os dados do formulário
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

        // Envia a requisição POST para o servidor
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
            window.location.href = '/'; // Redireciona para a página inicial após o cadastro
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao cadastrar ocorrencia.');
        });
    });
});
