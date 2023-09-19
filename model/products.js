import { Product } from "./product.js";
import { v4 as uuidv4 } from 'uuid';

export class Products {
  _listProduct = {};
  _listado = []
  id = 0;

  constructor() {
    this._listProduct = {};
    this._listado = [];

  }

  setId() {
    this.id++;
  }

  get getProducts() {  
    return this._listado;
  }


  setlistadoArr(){
    Object.keys(this._listProduct).forEach(key => {
      const producto = this._listProduct[key]
      this._listado.push(producto);
    });

  }

  getProductsById(id) {
    const productos = this._listado;
    const producto = productos.find(p => p.id === id);

    if (!producto)
      return "not found";

    return producto;
  }


  validarProducto(producto) {
      const productos = this._listado;
      const existeProducto = productos.some(p => p._code === producto._code);     
      console.log('existe Producto',existeProducto);
      return existeProducto;     
  }


  addProduct = (_title, _description, _price, _thumbnail, _code, _stock) => {


    if (_title === undefined || _description === undefined || _price === undefined || _thumbnail === undefined || _code === undefined || _stock === undefined) {
      console.error("TODOS LOS CAMPOS SON OBLIGATORIOS");
      return;
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

      if (existeProducto){
        console.error("Product Exitente");
        return;
      }
   
      const codidoUnico = uuidv4()
      this._listProduct[codidoUnico] = product;
      this.setlistadoArr();
      this.setId();
    
  };
}
