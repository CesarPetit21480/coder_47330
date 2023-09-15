import { Product } from "./product";

export class Products {

    _listProduct = {};

    constructor (){
        _listProduct = {}
    
    } 

    addProduct = (_title,_description,_price,_thumnail,_code,_stock)=>{
        const product = new Product(_title,_description,_price,_thumnail,_stock);
        this._listProduct = 
    };


    getCode = ()=>{

        
    }





}

