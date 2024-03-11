

function handleEnviarClick(event) {

  event.preventDefault();

  // Obtiene el "id" del botón clicado
  var id = this.getAttribute("data-id");

  // Crear un objeto con los datos a enviar
  const data = {
    uid: id
  };



  // Realizar la solicitud POST utilizando fetch
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

  console.log('entre');
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




