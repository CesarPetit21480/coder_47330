import { promises as fs } from "fs";

export class CartManager {
  constructor(_path) {
    this.path = _path;
  }

  async get() {
    return getJSONFromFile(this.path);
  }

  async createCart(newCart) {
    const { id, productos } = newCart;
    const existenDuplicados = await tieneDuplicados(productos); 

    if (id === undefined || existenDuplicados) {
      throw new Error(
        "Todos los campos son obligatorios. o existen productos repetidos"
      );
    }
    const carts = await getJSONFromFile(this.path);
    carts.push(newCart);
    await saveJSONToFile(this.path, carts);
    return;
  }
  async getCartById(id) {
    const carritos = await getJSONFromFile(this.path);
    const carrito = carritos.find((p) => p.id === id);
    if (!carrito) return undefined;
    return carrito;
  }

  async updateCarrito(cid, pid, _quantity) {
    // busco el carrito
    const carritoById = await this.getCartById(cid);

    if (!carritoById) return undefined;

    // verifico si existe el producto
    const producto = carritoById.productos.find((p) => p.id === pid);

    // si existe actualizo el producto
    if (producto) {
      producto.quantity += _quantity;
      const index = carritoById.productos.findIndex((p) => p.id === pid);
      if (index !== -1) {
        carritoById.productos[index] = producto;
      }
    } else {
      const newProduct = {
        id: pid,
        quantity: _quantity,
      };
      carritoById.productos.push(newProduct);
    }

    // traigo todos los carritos

    const carritos = await this.get();
    const indexCarrito = carritos.findIndex((c) => c.id === cid);
    if (indexCarrito !== -1) {
      carritos[indexCarrito] = carritoById;
    }

    await saveJSONToFile(this.path, carritos);
    return carritoById;
  }
}

const tieneDuplicados = async(arr) => {
  const valoresUnicos = new Set();

  for (const objeto of arr) {
    if (valoresUnicos.has(objeto.id)) {
      return true;
    }
    valoresUnicos.add(objeto.id);
  }

  return false;
};

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
    console.log("ww", error);
    throw new Error(`El archivo ${path} no pudo ser escrito.`);
  }
};
