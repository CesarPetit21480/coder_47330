  export class Product {
    code ="";
    title = "";
    description = "";
    price = "";
    thumbnail = "";   
    stock = 0;
    id = 0;
    #idCounter = 0;

    #generateId() {
      return ++this.#idCounter;
    }

    getId(){
      return this.id;
    }

    // getProductbyId(_id){
    // }    

    constructor(_title,_description,_price,_thumbnail,_code,_stock,_id){
        this.title = _title;
        this.description = _description;
        this.price = _price;
        this.thumbnail = _thumbnail;
        this.code = _code;
        this.stock = _stock;
        this.id = this.#generateId();
    }
  }