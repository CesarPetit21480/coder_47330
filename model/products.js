import { Product } from "./product.js";

export class Products {
  _listProduct = {};

  constructor() {
    this._listProduct = {};
  }

  addProduct = (_title, _description, _price, _thumbnail, _code, _stock,_id) => {
    const product = new Product(
      _title,
      _description,
      _price,
      _thumbnail,
      _code, 
      _stock,
      _id
    );
    const id = product.getId();

    this._listProduct[id] = product;
  };
}
