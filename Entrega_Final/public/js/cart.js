function quitarDelCarrito(event) {

    event.preventDefault();

    const idProducto = document.getElementById("productId").value;
    var idCarrito = this.getAttribute("data-id");

    const data = {
        cid: idCarrito,
        pid: idProducto
    };

    fetch('api/cart/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {

                Swal.fire({
                    text: "Producto Eliminado Correctamente del carrito 😊",
                    toast: true,
                    position: 'top-right'
                });
                setTimeout(function () {
                    location.reload(); // Recargar la página
                }, 3000);
            } else {
                console.error("Error al enviar el mensaje");
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
}


var quitoCarrito = document.querySelectorAll("#quito-carrito");

for (var i = 0; i < quitoCarrito.length; i++) {
    quitoCarrito[i].addEventListener("click", quitarDelCarrito);
}


function sumar() {


    

    let costoEnv = parseFloat(document.getElementById("costoEnvio").value);
    let subtotal = parseFloat(document.getElementById("subtotal").value);
    let total = subtotal + costoEnv;

    if (!isNaN(costoEnv) && !isNaN(subtotal)) {
        let resultado = costoEnv + subtotal;
        document.getElementById("total").value = resultado;
    }
}


function calcularCostoEnvio() {


    let costoEnv = Math.floor(Math.random() * 5000) + 1;
    document.getElementById("costoEnvio").value = costoEnv;
    sumar();
}
function facturar() {



    const b_total = document.getElementById("total").value;
    const b_direccion = document.getElementById("direccion").value;
    const b_email = document.getElementById("email").value;
    const b_idCarrito = document.getElementById("idCarrito").value;
    const b_costoEnvio = (document.getElementById("costoEnvio").value);
    const envioNumber = Number(b_costoEnvio);



    if (b_direccion.trim() === '' || b_email.trim() === '' || envioNumber === 0 ) {
        Swal.fire({
            text: "Falta campo Dirreccion, mail o falta calcular costo envio 😊",
            toast: true,
            position: 'top-right'
        });
    }
    else {


        const data = {
            total: b_total,
            direccion: b_direccion,
            email: b_email,
            id_carrito: b_idCarrito
        };

        fetch('/api/cart/facturar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        text: "Se Efectuo la compra Satifactoriamente 😊",
                        toast: true,
                        position: 'top-right'
                    });
                    setTimeout(function () {
                        window.location.href = "http://localhost:8080/products";
                        //location.reload(); // Recargar la página
                    }, 1000);
                } else {
                    console.error("Error al enviar el mensaje");
                }
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
            });

    }

}