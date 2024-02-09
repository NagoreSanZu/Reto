let ip = (new URL(window.location.origin)).hostname;

var ciudades = []
let intervalo;

aaaa();
function aaaa() {
    var tiempo = 15000;
    intervalo = setInterval(() => {
        cargarCiudades()
        console.log(tiempo)
    }, tiempo);
}

function cargarCiudades() {
    fetch(`http://${ip}:8086/api/recogerDatos`)
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {
            ciudades = data;
            cargarCards()
        })
}

function cargarCards() {
    //COMIENZO TOOLTIP
    var fecha = new Date();
    var zona;
    var hoy = fecha.getFullYear() + '/' + (fecha.getMonth() + 1).toString().padStart(2, '0') + '/' + fecha.getDate().toString().padStart(2, '0');
    var hoy2 = fecha.getFullYear().toString() + (fecha.getMonth() + 1).toString().padStart(2, '0') + fecha.getDate().toString().padStart(2, '0');

    sHtml = ""

    if (localStorage.getItem("ciudades")) {
        const options = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtiZHBAcGxhaWF1bmRpLm5ldCJ9.esSb8qEmgAHBGFxYHykISRcGOe2Gy2pgvKyGjOXiPN5W61c678Js_jDJcNQgg_IriUaEb3nzyYGNElRb59BYcjLgRgZ8uJ8hDMyLIJkT-jxGP64EX_gUQ3aKTrQyrN-Ybs5x6qs5bzs06hBDriYHLEUWswUnsRFrNqikvsnVmSjP6k9vQKnPg9ehF_xnvBM-3RsCvzJRul6H43VV4eCRzSkgbffT2fVUw9wGcS2kSVpY7AYLRcXv4qFcOwN09-cx_C1p076Z1sIoEfcZFgquSsI3Fm0j9TbQzSVG8LRBcOQazCgEve04Jce7SkiGGGbUkAZtqY98E_2sQfMZ1TKP1g'
            },
            mode: 'cors', // Indica que se permiten solicitudes CORS
            cache: 'no-cache', // No se almacena en caché la respuesta
            credentials: 'same-origin', // Envía las credenciales (por ejemplo, cookies) si el origen es el mismo
            redirect: 'follow', // Sigue las redirecciones del servidor
            referrerPolicy: 'no-referrer' // No envía el Referer header
        };

        ciudades.forEach((ciudad) => {
            if (localStorage.getItem("ciudades").includes(ciudad.nombre)) {
                if (ciudad.nombre == "irun") {
                    zona = "coast_zone"
                }

                if (ciudad.nombre == "donostia") {
                    zona = "donostialdea"
                }

                if (ciudad.nombre == "errenteria") {
                    zona = "donostialdea"
                }

                if (ciudad.nombre == "oiartzun") {
                    zona = "cantabrian_valleys"
                }

                var prediccion;

                const url = `https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/${zona}/locations/${ciudad.nombre}/forecast/at/${hoy}/for/${hoy2}`
                fetch(url, options)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("La solicitud no se pudo completar correctamente.");
                        }
                        return response.json()
                    })
                    .then(data => {
                        prediccion = data.forecastText.SPANISH

                    $(`[data-bs-toggle="tooltip-${ciudad.nombre}"]`).tooltip({
                        title: `${prediccion}`,
                        placement: 'top', // Posición del tooltip (top, bottom, left, right)
                        delay: { show: 500, hide: 100 }, // Retardo en ms antes de mostrar/ocultar el tooltip
                        boundary: 'window'
                    })

                    })//fin TOOLTIP
                sHtml += `
                    <div class="card tiempo dropzone" id="${ciudad.nombre}" data-bs-toggle="tooltip-${ciudad.nombre}" ondrop="drop(event)"  ondragover="allowDrop(event)">
                        <p><b>${ciudad.nombre.toUpperCase()}</b></p>
                        <p id="grados">${ciudad.temperatura}º </p>
                        <p></p>
                    </div>`

                document.getElementById("cards").innerHTML = sHtml;
            }

        })
    } else {
        document.getElementById("cards").innerHTML = "<p>Aún no se ha seleccionado ninguna ciudad</p>";
    }
}