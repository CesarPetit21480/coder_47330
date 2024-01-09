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
  
  export const generatorUserIdError = (id) => {
   return `Se debe enviar un identificador valido 😱.
    Valor recibido: ${id}`;
  } 
