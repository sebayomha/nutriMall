import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ProductInterface } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  productos: Array<ProductInterface>;

  constructor(private _bottomSheetRef: MatBottomSheetRef<ProductListComponent>) { }

  ngOnInit() {
    this.productos = JSON.parse(localStorage.getItem('productos')) ? JSON.parse(localStorage.getItem('productos')) : [];
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  quitarProducto(product) {
    const index = this.productos.findIndex( (producto:ProductInterface) => {
      return producto.idProducto === product.idProducto;
    });
    this.productos.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(this.productos));
    
    if (!this.productos.length) {
      const accion = {
        evento: 'eliminacion',
        productos: this.productos
      }
      this._bottomSheetRef.dismiss(accion);
    }
  }
  
  /* Obtiene el monto total de la venta */
  private getTotalCost(): number {
    return this.productos.reduce( (total, producto) => total += Number(producto.precio) , 0);
  }

  /* Obtiene la cantidad total de productos en una venta */
  private totalProductosAgregados(): number {
    return this.productos.reduce( (total, producto) => total += producto.unidad , 0);
  }
}
