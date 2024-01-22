var lugares = [
    { "nombre": "Irun", "latitud": 43.3390, "longitud": -1.7896 },
    { "nombre": "Donostia/San Sebastian", "latitud": 43.3183, "longitud": -1.9812 },
    { "nombre": "Errenteria", "latitud": 43.3119, "longitud": -1.8985 },
    { "nombre": "Oiartzun", "latitud": 43.2998, "longitud": -1.8608 },
    //{ "nombre": "Hernani", "latitud": 43.2653, "longitud": -1.9761 }

];



lugares.forEach((lugar) => {
    if (localStorage.getItem("ciudades") && localStorage.getItem("ciudades").includes(lugar.nombre)) {
        Dartiempo(lugar.nombre)
    } else {
        document.getElementById("mainTiempo").innerHTML = "<p>Aún no se ha seleccionado ninguna ciudad</p>"
    }
})




var map = L.map('mapa').setView([43.3119, -1.8985], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

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

})
//localstorage

function guardarDatos(ciudad) {
    if (localStorage.getItem("ciudades")) {
        if (!localStorage.getItem("ciudades").includes(ciudad)) {
            localStorage.setItem("ciudades", `${localStorage.getItem("ciudades")}.${ciudad}`)
        }
    } else {
        localStorage.setItem("ciudades", ciudad)
    }

    Dartiempo(ciudad)
}
