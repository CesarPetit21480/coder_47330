  export class Product {

    code ="";
    title = "";
    description = "";
    price = "";
    thumbnail = "";   
    stock = 0;

    constructor(_title,_description,_price,_thumbnail,_code,_stock){
        this.title = _title;
        this.description = _description;
        this.price = _price;
        this.thumbnail = _thumbnail;
        this.code = _code;
        this.stock = _stock;
    }
  }



  