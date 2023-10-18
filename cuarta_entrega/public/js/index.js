
const socket = io();

// cargo propductos nuevos

const formProduct = document.getElementById('form-product');
const formTittle = document.getElementById('form-tittle');
const formDescription = document.getElementById('form-description');
const formCode = document.getElementById('form-code');
const formPrice = document.getElementById('form-price');
const formStock = document.getElementById('form-stock');
const formcategory = document.getElementById('form-category');


formProduct.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nuevoProducto = {
        id: undefined,
        title: formTittle.value,
        description: formDescription.value,
        price: formPrice.value,
        thumbnails: [],
        code: formCode.value,
        stock: formStock.value,
        status: true,
        category: formcategory.value
    }
    socket.emit('new-product', nuevoProducto);

    Swal.fire({
        text: "Producto Agregado 😊",
        toast: true,
        position: 'top-right'
    });

    formTittle.value = '';
    formDescription.value = '';
    formCode.value = '';
    formCode.value = '';
    formPrice.value = '';
    formStock.value = ''
    formcategory.value = ''

});

const btnQuitar = document.getElementById('btn_quitar');
const idProduct = document.getElementById('id-product');


btnQuitar.addEventListener('click', () => {

    socket.emit('delete-product', idProduct.value);

    Swal.fire({
        text: `Se ha Quitado el producto con id: ${ idProduct.value} `,
        toast: true,
        position: 'top-right'
    });
    idProduct.value = '';

});





