import { promises as fs } from 'fs';

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
        this.path = _path
    }

    async createProduct(newProduct) {

        console.log('producto', newProduct);

        const { title, description, price, thumbnail, code, stock } = newProduct;

        if (
            title === undefined ||
            description === undefined ||
            price === undefined ||
            thumbnail === undefined ||
            code === undefined ||
            stock === undefined
        ) {
            throw new Error('Todos los campos son obligatorios.');
        }

        const products = await getJSONFromFile(this.path);
        const _id = products.length + 1;
        newProduct = {...newProduct, id :_id}; 

        console.log('producto Nuevo', newProduct);
        products.push(newProduct);
        await saveJSONToFile(this.path, products);
    }

    get() {
        return getJSONFromFile(this.path);
    }
}

const getJSONFromFile = async (path) => {
    try {
        await fs.access(path);
    } catch (error) {
        return [];
    }
    const content = await fs.readFile(path, 'utf-8');
    try {
        return JSON.parse(content);
    } catch (error) {
        throw new Error(`El archivo ${path} no tiene un formato JSON válido.`);
    }
}

const saveJSONToFile = async (path, data) => {
    const content = JSON.stringify(data, null, '\t');
    try {
        await fs.writeFile(path, content, 'utf-8');
    } catch (error) {
        throw new Error(`El archivo ${path} no pudo ser escrito.`);
    }
}


const testPrueba =async () => {

    const path = './products.json';

    try {
        const productManager = new ProductsManager(path);
        const prroductoNuevo = new Product("pera",
            "naranja Deliciosa",
            2500,
            "sin imagen",
            "abc123",
            25)
    
        // testing add products
        productManager.createProduct(prroductoNuevo);    
        const products = await productManager.get();
        console.log('Producto Generados:', products);
    
        
    } catch (error) {
        console.error('Ha ocurrido un error Al generar Poducto', error.message);
    }

 

}

testPrueba();