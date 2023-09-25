import { promises as fs } from "fs";

class Product {
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

class ProductsManager {
  constructor(_path) {
    this._listado = [];
    this.path = _path;
  }

  async createProduct(newProduct) {
    console.log("producto", newProduct);

    const { title, description, price, thumbnail, code, stock } = newProduct;

    if (
      title === undefined ||
      description === undefined ||
      price === undefined ||
      thumbnail === undefined ||
      code === undefined ||
      stock === undefined
    ) {
      throw new Error("Todos los campos son obligatorios.");
    }

    const products = await getJSONFromFile(this.path);
    const _id = products.length + 1;
    newProduct = { ...newProduct, id: _id };
    products.push(newProduct);
    await saveJSONToFile(this.path, products);
  }

  async get() {
    return getJSONFromFile(this.path);
  }

  async getProdutById(id) {
    try {
      const productos = getJSONFromFile(this.path);
      const producto = productos.find((p) => p.id === id);
      if (!producto) throw new Error(`id Inexistente`);
    } catch (error) {
      throw new Error(`No de Pudo Procesar la Solicitud ${error} `);
    }
  }
}

const getJSONFromFile = async (path) => {
  try {
    await fs.access(path);
  } catch (error) {
    return [];
  }
  const content = await fs.readFile(path, "utf-8");
  try {
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`El archivo ${path} no tiene un formato JSON válido.`);
  }
};

const saveJSONToFile = async (path, data) => {
  const content = JSON.stringify(data, null, "\t");
  try {
    await fs.writeFile(path, content, "utf-8");
  } catch (error) {
    throw new Error(`El archivo ${path} no pudo ser escrito.`);
  }
};

const testPrueba = async () => {
  const path = "./products.json";

  try {
    // Genero Nuevo Productos

    const productManager = new ProductsManager(path);
    const prroductoNuevo = new Product(
      "pera",
      "naranja Deliciosa",
      2500,
      "sin imagen",
      "abc123",
      25
    );

    // testing add products
    productManager.createProduct(prroductoNuevo);
    const products = await productManager.get();

    // Traigo todos los productos Archivo

    const productosArchivos = await productManager.get();
    console.log("productos del Archivo");
    console.log("---------------------");
    console.log(productosArchivos);

    // Traigo el Producto Por ID

    const id = 1;

    const producto = await productManager.getProdutById(id);
    console.log(`Producto con el id ${id}`);
    console.log("---------------------");
    console.log(productosArchivos);
  } catch (error) {
    console.error("Ha ocurrido un error Al generar Poducto", error.message);
  }
};

testPrueba();
