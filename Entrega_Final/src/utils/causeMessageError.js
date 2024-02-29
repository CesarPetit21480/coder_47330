export const generatorProductError = (product) => {
  return `Todos lo campos son requerios y deben ser valido 😱.
    Lista de campos recibidos en la solicitud:
      - title:        ${product.title}
      - last_name:    ${product.description}
      - description:  ${product.price}
      - code:         ${product.code}
      - stock:        ${product.stock}
      - category:     ${product.category}
      - thumbnails:   ${product.thumbnails}
      `;
};

export const generatorProductIdError = (id) => {
  return `Se debe enviar un identificador valido 😱.
    Valor recibido: ${id}`;
}

export const generatorCartError = (cart) => {
  return `Todos lo campos son requerios y deben ser valido 😱.
    Lista de campos recibidos en la solicitud:
      - id Producto:        ${cart.productId}
      - quantity:    ${cart.cantidad}
      - id user:  ${cart.userId}
    
      `;
};


export const generatorUserError = (user) => {
  return `Todos lo campos son requerios y deben ser valido 😱.
    Lista de campos recibidos en la solicitud:
      - first_name:        ${user.first_name}
      - last_name:    ${user.last_name}
      - age:  ${user.age}
      - password:  ${user.password}
      - provider:         ${user.provider}
 
      `;
};

