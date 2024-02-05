function drag(ev, id) {
    ev.dataTransfer.setData("text", id);
    console.log(id)
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

function darDatos(id, lugarDestino) {
    if (id == "estadoCielo") {
        sHtml = ""
        ciudades.forEach((ciudad) => {
            if (lugarDestino == ciudad.nombre) {
                console.log(ciudad.nombre)
                // sHtml += '<div class="col-12 col-md-6 dropzone" ondrop="drop(event)" ondragover="allowDrop(event)">'
                sHtml += `
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
                console.log(ciudad.nombre)
                // sHtml += '<div class="col-12 col-md-6 dropzone" ondrop="drop(event)" ondragover="allowDrop(event)">'
                sHtml += `
                                <p> <b>Visibilidad:</b></p>
                                <p>${ciudad.visibilidad}</p>
                                <img></im>
                                
                              `
                document.getElementById(`${ciudad.nombre}`).innerHTML = sHtml;
            }
        })

    }
    if (id == "humedad") {
        console.log("he entrado en humedad")
        sHtml = ""
        ciudades.forEach((ciudad) => {
            if (lugarDestino == ciudad.nombre) {
                sHtml += `
                                <p> <b>La humedad es del:</b></p>
                                <p>${ciudad.humedad}%</p>`
                document.getElementById(`${ciudad.nombre}`).innerHTML = sHtml;
            }
        })

    }

}




function resetEstado() {
    cargarCiudades()
}