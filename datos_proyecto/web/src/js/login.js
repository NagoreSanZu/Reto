var urlActual = (new URL(window.location.origin)).hostname;
const laravelApi = "http://"+urlActual+":8086";
async function login(correo, contrasena) {
    console.log(correo, contrasena)
    await fetch(laravelApi + "/api/login", {
        method: "POST",
        body: JSON.stringify({
            email: correo,
            password: contrasena
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((respuesta) => {
        console.log(respuesta);
        return respuesta.json()
    }).then((data) => {
        console.log(data);

        if (data["success"]) {
            sessionStorage.setItem("token", data["data"]["token"]);
            sessionStorage.setItem("nombre", data["data"]["nombre"]);

            window.location.href = "paginaInicio.html"

        } else {
            // Ha fallado el login
            console.error('Error en el inicio de sesión:', data["error"]);
            alert("Contraseña incorrecta")
        }
    })
        ;

    // let data = await respuesta.json();

}

// function mostrarInicio(){
//     // document.getElementById("bodyInicio").style.visibility="visble";
//     // document.getElementById("bodyInicio").style.display="block";

//     window.location.href = "index.html"

// }

async function register(nombre, correo, contrasena, cContrasena) {
    console.log(correo, contrasena, nombre, cContrasena)

    try {
        let respuesta = await fetch(laravelApi + "/api/register", {
            method: "POST",
            body: JSON.stringify({
                name: nombre,
                email: correo,
                password: contrasena,
                c_password: cContrasena
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        let data = await respuesta.json();
        console.log(data);

        if (data["success"]) {
            sessionStorage.setItem("token", data["data"]["token"]);
            sessionStorage.setItem("nombre", nombre);

            window.location.href = "paginaInicio.html"

        } else {
            // Ha fallado el login
            console.error('Error al registrarse:', data["error"]);
        }
    } catch (error) {
        console.error(error);

    }
}

async function logout() {
    window.location.href = "index.html"
    try {
        let respuesta = await fetch(laravelApi + "/api/logout", {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: 'Bearer ' + sessionStorage.getItem("token")
            }
        });

        let data = await respuesta.json();
        console.log(data);

        if (data["success"]) {
            sessionStorage.removeItem("token");
        }
    } catch (error) {
        console.log(error);
    }
}


function mostrarNombre(){
    var nombre = sessionStorage.getItem("nombre")
    alert("Nombre de usuario: " + nombre );

}