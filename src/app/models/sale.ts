import { ProductInterface } from './product';
import { MetodoPagoInterface } from './metodo-pago';

export interface SaleInterface {
    productos: Array<ProductInterface>;
    sexo: String;
    date: String;
    comentario: String;
    idUser: number;
    medioDePago: MetodoPagoInterface;
    montoTotalVenta: number;
}

export class Sale implements SaleInterface {
    productos: Array<ProductInterface>;
    sexo: String;
    date: String;
    comentario: String;
    idUser: number;
    medioDePago: MetodoPagoInterface;
    montoTotalVenta: number;

    // tslint:disable-next-line:max-line-length
    constructor(productos: Array<ProductInterface>, sexo: String, date: String, idUser: number, comentario: String, medioDePago: MetodoPagoInterface, montoTotalVenta: number) {
        this.productos = productos;
        this.sexo = sexo;
        this.date = date;
        this.comentario = comentario;
        this.idUser = idUser;
        this.medioDePago = medioDePago;
        this.montoTotalVenta = montoTotalVenta;
    }
}