const socket = io();
const cardProducts = document.getElementById('card-products');

socket.on('list-Product', (productos) => {
    generarCard(productos)
})

const generarCard = (productos) => {

    cardProducts.innerHTML = '';
    productos.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('cardStyle');
        div.innerHTML = `   
        <div class="card text-center text-white bg-dark bg-gradient cardStyle">
        <div class="card-header">
       ${product.id}
        </div>
        <div class="card-body">
        <h5 class="card-title">Stock ${product.title}</h5>
        <h5 class="card-title">Stock ${product.stock}</h5>
        <h5 class="card-title"> Price ${product.price}</h5>
        <p class="card-text text-warning">${product.description}</p>  
        </div>
        <div class="card-footer  text-info">
        ${product.category}
        </div>
        </div>
        `
        cardProducts.appendChild(div);
    });



}

socket.on('update-listProducts', (listaProductos) => {
    generarCard(listaProductos);
    Swal.fire({
        text: "Productos Actualizados",
        toast: true,
        position: 'top-right'
    });

});



