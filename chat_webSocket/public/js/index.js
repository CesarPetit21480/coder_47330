(function () {
    const socket = io();
    let userName;
    //form-message
    const formMessage = document.getElementById('form-message');
    //input-message
    const inputMessage = document.getElementById('input-message');
    //log-message
    const logMessage = document.getElementById('log-message');



    formMessage.addEventListener('submit', (event) => {
        event.preventDefault();
        const text = inputMessage.value;
        socket.emit('new-message', { userName, text });
        inputMessage.value = '';
        inputMessage.focus();
    });

    const updateLogMessage = (messages) => {
        logMessage.innerText = '';
        messages.forEach((msg) => {
            const p = document.createElement('p');
            p.innerText = `${msg.userName} : ${msg.text}`;
            logMessage.appendChild(p)
        });
    }

    socket.on('notification', ({ messages }) => {
        updateLogMessage(messages)
    })

    socket.on('new-client', () => {
        Swal.fire({
            text: "Nuevo Usuario Conectado 😊",
            toast: true,
            position: 'top-right'
        });
    });


    Swal.fire({
        title: `Identificate para el chat 👮‍♂️`,
        input: 'text',
        inputLabel: 'Ingresa tu user name',
        allowOutsideClick: false,
        inputValidator: (value) => {
            if (!value)
                return "Se requiere el user Name para continuar!!!"
        }
    })
        .then((result) => {
            userName = result.value.trim();
            console.log(`Hola User Name: ${userName} 👋`);

        });







})(); 