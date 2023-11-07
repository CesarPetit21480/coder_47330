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

document.getElementById("enviar").addEventListener("click", function(event) {
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
        setTimeout(function() {
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