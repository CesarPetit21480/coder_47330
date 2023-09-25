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
    const _id = (await this.getUltimoId()) + 1;
    newProduct = { ...newProduct, id: _id };
    products.push(newProduct);
    await saveJSONToFile(this.path, products);
  }

  async get() {
    return getJSONFromFile(this.path);
  }

  async getProductById(id) {
    try {
      const productos = await getJSONFromFile(this.path);
      const producto = productos.find((p) => p.id === id);
      if (!producto) throw new Error(`id Inexistente`);
      return producto;
    } catch (error) {
      throw new Error(`No de Pudo Procesar la Solicitud ${error} `);
    }
  }

  async updateProductById(id, productoActualizado) {
    const productos = await getJSONFromFile(this.path);
    let producto = productos.find((p) => p.id === id);
    producto = { ...productoActualizado, id: producto.id };

    const index = productos.findIndex((p) => p.id === id);
    if (index !== -1) {
      productos[index] = producto;
    }
    await saveJSONToFile(this.path, productos);
    return producto;
  }

  async deleteProductByid(id) {
    try {
      const productos = await getJSONFromFile(this.path);
      let producto = productos.find((p) => p.id === id);
      let nuevaLista = productos.filter((p) => p.id !== id);
      await saveJSONToFile(this.path, nuevaLista);
      return producto;
    } catch (error) {
      throw Error("fallo la eliminacion", error);
    }
  }

  async getUltimoId() {
    const productos = await getJSONFromFile(this.path);
   
    if (productos.length === 0) return 0;

    const ultimoRegistro = productos.length - 1;
    const ultimoId = productos[ultimoRegistro].id;
    return ultimoId;
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

const testCrear = async () => {
  const path = "./products.json";

  try {
    // Genero Nuevo Productos

    const productManager = new ProductsManager(path);
    const prroductoNuevo = new Product(
      "Naranja",
      "Naranja Rica",
      2500,
      "sin imagen",
      "abc124",
      25
    );

    // testing add products

    await productManager.createProduct(prroductoNuevo);

    // Traigo todos los productos Archivo

    const productosArchivos = await productManager.get();
    console.log("productos del Archivo");
    console.log("---------------------");
    console.log(productosArchivos);
  } catch (error) {
    console.error("Ha ocurrido un error Al generar Poducto", error.message);
  }
};

const testBuscar = async () => {
  const path = "./products.json";
  const productManager = new ProductsManager(path);

  try {
    // Traigo el Producto Por ID

    const id = 2;
    const producto = await productManager.getProductById(id);
    console.log(`Producto con el id ${id}`);
    console.log("---------------------");
    console.log(producto);
  } catch (error) {
    throw Error("Error al buscar producto: ", error);
  }
};

const testActualizar = async () => {
  const path = "./products.json";
  const productManager = new ProductsManager(path);

  try {
    const id = 4;

    // producto A actualizar
    const productoModificado = new Product(
      "Morron",
      "Morron Rojo",
      4800,
      "sin imagen Nueva",
      "abc128",
      25
    );

    // leo el producto original

    const productoOriginal = await productManager.getProdutById(id);

    // Actualizo el producto

    const productoActualizado = await productManager.updateProductById(
      id,
      productoModificado
    );
    console.log("producto Original");
    console.log("-----------------");
    console.log(productoOriginal);

    console.log("producto Actualizado");
    console.log("-----------------");
    console.log(productoActualizado);
  } catch (error) {
    throw Error("Error al actualizar producto: ", error);
  }
};

const testEliminar = async () => {
  const path = "./products.json";
  const productManager = new ProductsManager(path);

  try {
    const id = 1;

    // leo el producto original

    const productoEliminado = await productManager.deleteProductByid(id);
    console.log(
      `El producto ${productoEliminado.title} fue eliminado correctamente`
    );
  } catch (error) {
    throw Error("Error al Eliminar producto: ", error);
  }
};

const testMostrar = async () => {
  const path = "./products.json";
  const productManager = new ProductsManager(path);
  try {
    const productos = await productManager.get();
    console.log("LISTADO PRODUCTOS FINAL");
    console.log("-----------------------");
    console.log(productos);
  } catch (error) {
    throw Error("Error al mostrar producto: ", error);
  }
};

testCrear();
testBuscar();
testActualizar();
testEliminar();
testMostrar();
