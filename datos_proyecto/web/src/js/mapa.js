var map = L.map('mapa').setView([43.3119, -1.8985], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

fetch(`http://${ip}:8086/api/recogerDatos`)
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
                marker._icon.classList.add("seleccionado")
                guardarDatos(lugar.nombre)
            })
            marker.on('dblclick', function () {
                borrarDatosLS(lugar.nombre, this)
            })
            if(localStorage.getItem("ciudades") && localStorage.getItem("ciudades").includes(lugar.nombre)){
                marker._icon.classList.add("seleccionado")
            }
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


function borrarDatosLS(nombreCiudad, marker) {
    marker._icon.classList.remove("seleccionado")
    if (localStorage.getItem("ciudades").includes(nombreCiudad + ".")) {

        // obtenemos las ciudades
        let ciudadesLS = localStorage.getItem("ciudades")

        // reemplazamos la ciudad
        ciudadesLS = ciudadesLS.replace(nombreCiudad + ".", "")

        // reasignar el local storage
        localStorage.setItem("ciudades", ciudadesLS);
    } else if (localStorage.getItem("ciudades").includes("." + nombreCiudad)) {
        // obtenemos las ciudades
        let ciudadesLS = localStorage.getItem("ciudades")

        // reemplazamos la ciudad
        ciudadesLS = ciudadesLS.replace("." + nombreCiudad, "")

        // reasignar el local storage
        localStorage.setItem("ciudades", ciudadesLS)
    } else {
        localStorage.removeItem("ciudades")
        document.getElementById("cards").innerHTML = "<p>Aún no se ha seleccionado ninguna ciudad</p>"
    }


}


