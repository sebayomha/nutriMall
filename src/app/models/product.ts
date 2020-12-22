export interface ProductInterface {
    idProducto?: number;
    nombre: String;
    precio: number;
    unidad: number;
    categoria: String;
    peso: String;
    imgUrl: String;
}

export class Product implements ProductInterface {
    idProducto?: number;
    nombre: String;
    precio: number;
    unidad: number;
    categoria: String;
    peso: String;
    imgUrl: String;

    constructor(nombre: String, precio: number, unidad: number, categoria: String, imgUrl: String, idProducto?: number, peso?: String) {
        this.nombre = nombre;
        this.precio = precio;
        this.unidad = unidad;
        this.categoria = categoria;
        this.idProducto = idProducto;
        this.peso = peso;
        this.imgUrl = imgUrl;
    }
}
