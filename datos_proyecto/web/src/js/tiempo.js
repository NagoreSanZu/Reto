//tiempo api
function Dartiempo(ciudad) {

    fetch("./src/js/BBDD_sim.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {
            sHtml = ""
            data.ciudades.forEach((ciudad) => {
                if (localStorage.getItem("ciudades").includes(ciudad.nombre)) {
                    sHtml += '<div class="col-12 col-md-6">'
                    sHtml += `<div class="card" id="tiempo">
                                <p><b>${ciudad.nombre}</b></p>
                                <p><i class="fas fa-sun"></i></p>
                                <p>${ciudad.grados} </p>
                                <p>${ciudad.humedad}</p>
                              

                              </div>`
                    sHtml += '</div>'
                    document.getElementById("mainTiempo").innerHTML = sHtml;
                }

            })




            //  document.getElementById("tiempo").innerHTML = `<p>${nombreMunicipio}</p><p>${tempActual}</p><p>${humedad}%</p>`
            //   arrayTiempo.push({tempActual,nombreMunicipio,humedad})
            //     agregarCard()
        })
        .catch(error => {
            console.error("Error al cargar el archivo:", error);
        });


}


//20045
//20670



