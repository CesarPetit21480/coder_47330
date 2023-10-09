export class CartManager {
  constructor(_path) {
    this._listado = [];
    this.path = _path;
  }


  async createCart(newcart) {
    const { cid, pid, quantity } = newcart;

    if (
      (cid === undefined ||
        pid === undefined ||
        quantity === undefined)
    ) {
      throw new Error("Todos los campos son obligatorios.");
    }

    const carts = await getJSONFromFile(this.path);

    const existeCid = carts.some(cart => cart.id === cid);

    if (!existeCid) {
      carts.push(newcart);
      await saveJSONToFile(this.path, newcart);
      return;
    }

    const elementosCarrito = carts.filter(cart => cart.id === cid);
    existeProducto = elementosCarrito.some(p => p.pid === pid);

    if (existeProducto)
    {
      let producto = elementosCarrito.find((p) => p.id === id);
      producto = {id: producto.id, quantity: producto.quantity + quantity};
      const index = elementosCarrito.findIndex((p => p.pid === pid));    
      if (index !== -1) {
        elementosCarrito[index] = producto;
      }

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