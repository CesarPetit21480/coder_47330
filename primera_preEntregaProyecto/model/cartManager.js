import { promises as fs } from "fs";

export class CartManager {
  constructor(_path) {
    this.path = _path;
  }

  async get() {
    return getJSONFromFile(this.path);
  }

  async createCart(newCart) {
    //const { id } = newCart;

    // if (id === undefined) {
    //   throw new Error("Todos los campos son obligatorios.");
    // }   
    const carts = await getJSONFromFile(this.path);
    carts.push(newCart);    
    await saveJSONToFile(this.path, carts);
    return;
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

    console.log('ww',error)
    throw new Error(`El archivo ${path} no pudo ser escrito.`);
  }
};
