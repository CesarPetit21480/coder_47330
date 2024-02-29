

function handleEnviarClick(event) {

  console.log("entre");

  event.preventDefault();

  // Obtiene el "id" del botón clicado
  var id = this.getAttribute("data-id");
  const cant = document.getElementById("cant_" + id).value;
  const user = document.getElementById("idUser").value;

    // Crear un objeto con los datos a enviar
  const data = {
    productId: id,
    cantidad: cant,
    userId : user
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

var envioButtons = document.querySelectorAll("#envio-button");

for (var i = 0; i < envioButtons.length; i++) {
  envioButtons[i].addEventListener("click", handleEnviarClick);
}


function reruperarCorreo(event) {

  event.preventDefault();
  Swal.fire({
    title: "Ingrese su correo electronico",
    input: "text",
    inputAttributes: {
      autocapitalize: "off"
    },
    showCancelButton: true,
    confirmButtonText: "Enviar",
    showLoaderOnConfirm: true,
    preConfirm: async (email) => {
      try {

        const githubUrl = `/api/user/recovery-password/email/${email}`;
        const response =  await  fetch(githubUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (!response.ok) {
          return Swal.showValidationMessage(`
            ${JSON.stringify(await response.json())}
          `);
        }
        return response.json(); 

      } catch (error) {
        Swal.showValidationMessage(`
          Request failed: ${error}
        `);
      }
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `Mail Enviado Correctamente`,
        imageUrl: result.value.avatar_url
      });
    }
  });
}

let envioRecuperar = document.getElementById("recuperar");
envioRecuperar.addEventListener("click", reruperarCorreo);




  

// document.getElementById("enviar").addEventListener("click", function (event) {
  
//   event.preventDefault();



//   // Obtener los valores de los campos de entrada
//   const user = document.querySelector('input[name="user"]').value;
//   const message = document.querySelector('input[name="message"]').value;

//   // Crear un objeto con los datos a enviar
//   const data = {
//     user: user,
//     message: message
//   };

//   // Realizar la solicitud POST utilizando fetch
//   fetch('/api/message', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//     .then(response => {
//       if (response.ok) {

//         Swal.fire({
//           text: "Mensaje Agregado 😊",
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