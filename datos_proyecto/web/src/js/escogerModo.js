function drag(ev, id) {
    ev.dataTransfer.setData("text", id);
}


function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var id = ev.dataTransfer.getData("text");
    var elementToClone = document.getElementById(id);
    if (elementToClone) {
        var nodeCopy = elementToClone.cloneNode(true);
        nodeCopy.id = `idIcono${id}`;
        var lugar = ev.target.closest('.card').getAttribute('id');
        console.log("La imagen fue soltada en la card con ID:", lugar, id);
        // ev.target.appendChild(nodeCopy);
        darDatos(id, lugar);
    } else {
        console.error("No se pudo encontrar el elemento con el ID especificado:", id);
    }
}
var configuracion
function darDatos(id, lugarDestino) {
    clearInterval(intervalo);

    if (id == "estadoCielo") {
        sHtml = ""
        ciudades.forEach((ciudad) => {
            if (lugarDestino == ciudad.nombre) {
                configuracion = ciudad.nombre
                sHtml += `      <p><b>${ciudad.nombre.toUpperCase()}</b></p>
                                <p><b>Estado del cielo</b></p>
                                <p>${ciudad.estadoCielo}</p>
                                <p> <b> Nubes:</b></p>
                                <p>${ciudad.nubes}%</p>
                             `
                document.getElementById(`${ciudad.nombre}`).innerHTML = sHtml;

            }
        })

    }

    if (id == "sol") {
        sHtml = ""
        ciudades.forEach((ciudad) => {
            if (lugarDestino == ciudad.nombre) {
                configuracion = ciudad.nombre

                sHtml += `      <p><b>${ciudad.nombre.toUpperCase()}</b></p>
                                <p><b >Visibilidad:</b></p>
                                <p>${ciudad.visibilidad}</p>
                                <img></im>
                                
                              `
                document.getElementById(`${ciudad.nombre}`).innerHTML = sHtml;
            }
        })

    }
    if (id == "humedad") {
        sHtml = ""
        ciudades.forEach((ciudad) => {
            if (lugarDestino == ciudad.nombre) {
                configuracion = ciudad.nombre

                sHtml += `      <p><b>${ciudad.nombre.toUpperCase()}</b></p>
                                <p> <b>La humedad es del:</b></p>
                                <p>${ciudad.humedad}%</p>`
                document.getElementById(`${ciudad.nombre}`).innerHTML = sHtml;
            }
        })

    }

}

function resetEstado() {
    cargarCiudades();
    aaaa();
}