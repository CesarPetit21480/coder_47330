

function handleEnviarClick(event) {

  event.preventDefault();
 
  var id = this.getAttribute("data-id");
 
  const data = {
    uid: id
  };

  fetch('api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {

        Swal.fire({
          text: "Usuario Eliminado Correctamente 😊",
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


function handleEnviarClickRole(event) {

  event.preventDefault();

  var userId = this.getAttribute('data-id');
  var select = document.getElementById('selector-' + userId);
  var newRoleId = select.value;

  const data = {
    uid: userId,
    roleNew: newRoleId
  };


  // Realizar la solicitud POST utilizando fetch
  fetch('api/user/updateRole', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {

        Swal.fire({
          text: "Se ha actualizado el role correcamente 😊",
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


var envioRoles = document.querySelectorAll("#envio-role");
console.log("cantidad", envioRoles);
for (var i = 0; i < envioRoles.length; i++) {
  console.log("i", envioRoles);
  console.log("i", i);
  envioRoles[i].addEventListener("click", handleEnviarClickRole);
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


