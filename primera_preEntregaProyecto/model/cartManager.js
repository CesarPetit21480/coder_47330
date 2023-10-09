export class CartManager {
 constructor(_path) {
    this._listado = [];
    this.path = _path;
  }

  async get() {
    return getJSONFromFile(this.path);
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