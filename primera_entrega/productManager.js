// Creacion Clases

// CLASS PRODUCT

class Product {
  code = "";
  title = "";
  description = "";
  price = "";
  thumbnail = "";
  stock = 0;
  id = "";

  constructor(_title, _description, _price, _thumbnail, _code, _stock, _id) {
    this.title = _title;
    this.description = _description;
    this.price = _price;
    this.thumbnail = _thumbnail;
    this.code = _code;
    this.stock = _stock;
    this.id = _id;
  }
}

// CLASS PRODUCTS

class Products {
  _listado = [];
  id = 1;

  constructor() {  
    this._listado = [];
  }

  setId() {
    this.id++;
  }

  get getProducts() {
    return this._listado;
  }

  setlistadoArr(producto) {  
      this._listado.push(producto);
    
  };

  getProductsById(id) {
    const productos = this._listado;
    const producto = productos.find((p) => p.id === id);

    if (!producto) return "not found";

    return producto;
  }

  validarProducto(producto) {
    const productos = this._listado;

    const existeProducto = productos.some((p) => p.code === producto.code);
    return existeProducto;
  }

  addProduct = (_title, _description, _price, _thumbnail, _code, _stock) => {
    if (
      _title === undefined ||
      _description === undefined ||
      _price === undefined ||
      _thumbnail === undefined ||
      _code === undefined ||
      _stock === undefined
    ) {
        throw new Error('Todos los campos son obligatorios.');
    }

    const product = new Product(
      _title,
      _description,
      _price,
      _thumbnail,
      _code,
      _stock,
      this.id
    );

    const existeProducto = this.validarProducto(product); 

    if (existeProducto) {
        throw new Error('Producto Existente');
    }   
    this.setlistadoArr(product);
    this.setId();
  };
}

const testPrueba = () => {
  const products = new Products();

  // testing add products
  products.addProduct(
    "Naranja",
    "naranja Deliciosa",
    2500,
    "sin imagen",
    "abc123",
    25
  );
  products.addProduct(
    "Naranja",
    "naranja Deliciosa",
    2500,
    "sin imagen",
    "abc124",
    25
  );

  const productosCargados = products.getProducts;

  if (productosCargados.length > 0) console.log('PRODUCTOS CARGADOS',productosCargados);

  // teting product by id

  const Resultado = products.getProductsById(1);

  console.log('Producto Buscado',Resultado);
};

testPrueba();
