

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
