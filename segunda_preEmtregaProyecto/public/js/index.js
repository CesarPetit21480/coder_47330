// const formMessage = document.getElementById('form-message');



// formMessage.addEventListener('submit', (event) => {
//     alert('hola');
//     event.preventDefault();  
//     inputMessage.value = '';
//     inputMessage.focus();

//     Swal.fire({
//         text: "Mensaje Agregado 😊",
//         toast: true,
//         position: 'top-right'
//     });
// });


function handleEnviarClick(event) {
  event.preventDefault(); 

  // Obtiene el "id" del botón clicado
  var id = this.getAttribute("data-id");
  const cantidad = document.querySelector('input[name="cantidad"]').value;

  
  // Crear un objeto con los datos a enviar
  const data = {
    productId: id,
    cantidad: cantidad
  };

  // Realizar la solicitud POST utilizando fetch
  fetch('api/cart/manejador', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {

        Swal.fire({
          text: "Producto al carrito Agregado 😊",
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

var envioButtons = document.querySelectorAll(".envio-button");

for (var i = 0; i < envioButtons.length; i++) {
  envioButtons[i].addEventListener("click", handleEnviarClick);
}





// document.getElementById("enviarProducto").addEventListener("click", function (event) {
//   event.preventDefault();



//   // Obtener los valores de los campos de entrada
//   const id = document.querySelector('input[name="productId"]').value;
//   const cantidad = document.querySelector('input[name="cantidad"]').value;
//   const idProducto = document.querySelector('input[name="idProduct"]').value;



//   // Crear un objeto con los datos a enviar
//   const data = {
//     productId: id,
//     cantidad: cantidad
//   };

//   // Realizar la solicitud POST utilizando fetch
//   fetch('api/cart/manejador', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//     .then(response => {
//       if (response.ok) {

//         Swal.fire({
//           text: "Producto al carrito Agregado 😊",
//           toast: true,
//           position: 'top-right'
//         });
//         setTimeout(function () {
//           location.reload(); // Recargar la página
//         }, 3000);
//       } else {
//         console.error("Error al enviar el mensaje");
//       }
//     })
//     .catch(error => {
//       console.error("Error en la solicitud:", error);
//     });
// });


document.getElementById("enviar").addEventListener("click", function (event) {
  event.preventDefault();



  // Obtener los valores de los campos de entrada
  const user = document.querySelector('input[name="user"]').value;
  const message = document.querySelector('input[name="message"]').value;

  // Crear un objeto con los datos a enviar
  const data = {
    user: user,
    message: message
  };

  // Realizar la solicitud POST utilizando fetch
  fetch('/api/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {

        Swal.fire({
          text: "Mensaje Agregado 😊",
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


});