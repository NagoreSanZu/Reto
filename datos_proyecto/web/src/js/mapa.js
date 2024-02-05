var map = L.map('mapa').setView([43.3119, -1.8985], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

fetch("http://10.10.17.199:8086/api/recogerDatos")
    .then(response => {
        if (!response.ok) {
            throw new Error("La solicitud no se pudo completar correctamente.");
        }
        return response.json();
    })
    .then(lugares => {

        lugares.forEach((lugar) => {
            var marker = L.marker([lugar.latitud, lugar.longitud]).addTo(map);
            marker.bindTooltip(lugar.nombre, {
                permanent: false,
                direction: 'top',
                offset: L.point(0, -20)
            })

            marker.on('click', function () {
                guardarDatos(lugar.nombre)
            })
            cargarCiudades()
        })
    });

function guardarDatos(ciudad) {
    if (localStorage.getItem("ciudades")) {
        if (!localStorage.getItem("ciudades").includes(ciudad)) {
            localStorage.setItem("ciudades", `${localStorage.getItem("ciudades")}.${ciudad}`)
        }
    } else {
        localStorage.setItem("ciudades", ciudad)
    }

    cargarCiudades()
}
