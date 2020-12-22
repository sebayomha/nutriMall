import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductInterface, Product } from '../../../models/product';
import { MetodoPagoInterface } from '../../../models/metodo-pago';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProductListComponent } from '../product-list/product-list.component';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../snackbar/snackbar/snackbar.component';
import { ProductService } from 'src/app/services/product/product.service';
import { Response } from 'src/app/models/response';
import { Observable } from 'rxjs';
import { SalesService } from 'src/app/services/sales/sales.service';
import { Sale } from 'src/app/models/sale';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  @ViewChild('barcodeInput2', { static: true }) barcodeInput: ElementRef;
  @ViewChild('inputEditDescuento') inputEditDescuento: ElementRef;
  @ViewChild('busquedaCodigoForm', { static: true }) busquedaFormElement: NgForm;
  @ViewChild('stepper', { static: true }) stepper: MatStepper;

  /* Arrays de productos */
  productos: Array<ProductInterface> = new Array();

  /* Campos formulario para agregar producto */
  barcode: String;
  retrievedProduct: ProductInterface = new Product("", null, 0, "", "", null, "");

  /* Metodos de pago */
  methodPayments: Array<MetodoPagoInterface> = new Array();

  /*Inputs detalle de pago */
  medioDePago: MetodoPagoInterface;
  genero: String;
  comentario: String = "";
  idVenta: String;

  /* flags */
  panelOpenState: boolean = true;
  secondPanelExpanded: boolean = false;
  hasToShake: boolean = false;
  periodToShake: number = 0;
  isEditingDescuento: boolean = false;

  constructor(private _bottomSheet: MatBottomSheet, private snackbar: MatSnackBar, private productService: ProductService, private salesService: SalesService, private authService: AuthService) { }

  ngOnInit() {
    
    this.productos = JSON.parse(localStorage.getItem("productos")) ? JSON.parse(localStorage.getItem("productos")) : [];
    
    /* Metodos de pagos hardcodeados */
    const methodPayment1: MetodoPagoInterface = {'idMedioPago': 1, 'nombre': 'Efectivo', 'porcentajeDescuento': 0, 'porcentajeOriginal': 0 };
    const methodPayment2: MetodoPagoInterface = {'idMedioPago': 2, 'nombre': 'Débito', 'porcentajeDescuento': 0, 'porcentajeOriginal': 0 };
    const methodPayment3: MetodoPagoInterface = {'idMedioPago': 3, 'nombre': 'Crédito', 'porcentajeDescuento': 0, 'porcentajeOriginal': 0 };
    const methodPayment4: MetodoPagoInterface = {'idMedioPago': 4, 'nombre': 'QR', 'porcentajeDescuento': 0, 'porcentajeOriginal': 0 };

    this.methodPayments.push(methodPayment1, methodPayment2, methodPayment3, methodPayment4);
    this.medioDePago = methodPayment1;
    this.genero = "m";
  }

  ngAfterContentInit() {
    setTimeout( () => {
      this.barcodeInput.nativeElement.focus();
      this.busquedaFormElement.resetForm();
    }, 500) 
  }

  /* Verifica si debe agregar o hacer un update de un producto en el listado de productos agregados */
  private addUpdateProductosAgregados(): void {
    const index = this.productos.findIndex( (producto: ProductInterface) => {
      if (this.retrievedProduct.idProducto === producto.idProducto) {
        return true;
      }
      return false;
    });

    if (index === -1) {
      this.productos.push(new Product(this.retrievedProduct.nombre, this.retrievedProduct.precio, this.retrievedProduct.unidad, this.retrievedProduct.categoria, this.retrievedProduct.imgUrl ,this.retrievedProduct.idProducto, this.retrievedProduct.peso));
    } else {
      this.productos[index].precio += this.retrievedProduct.precio;
      this.productos[index].unidad += 1;
    }

    localStorage.setItem("productos", JSON.stringify(this.productos))
  }

  /* Obtiene el monto total de la venta */
  private getTotalCost(): number {
    return this.productos.reduce( (total, producto) => total += Number(producto.precio) , 0);
  }

  private getTotalNeto(): number {
    const totalBruto = this.getTotalCost();
    return (totalBruto - ((totalBruto * Number(this.medioDePago.porcentajeDescuento) / 100)));
  }

  /* Obtiene la cantidad total de productos en una venta */
  private totalProductosAgregados(): number {
    return this.productos.reduce( (total, producto) => total += producto.unidad , 0);
  }

  agregarProducto(): void {
    this.panelOpenState = true; 
    this.secondPanelExpanded = false;
    this.addUpdateProductosAgregados();
    this.barcodeInput.nativeElement.focus();
    this.barcode = "";
    this.barcodeInput.nativeElement.value = "";
    this.periodToShake = 2;
    this.hasToShake = true;
    const data = {
      code: 0,
      data: `${this.retrievedProduct.nombre} x${this.retrievedProduct.peso} - $${this.retrievedProduct.precio} agregado correctamente`
    }
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration: 1.5 * 1100,
      data: data,
      panelClass: ['success']
    });
  }

  openBottomSheet(): void {
    if (this.productos.length) {
      this._bottomSheet.open(ProductListComponent).afterDismissed().subscribe( (accion) => {
        if (accion) 
          this.productos = accion.productos;
      });
    }
  }

  formatInput($event): void {
    this.barcode = $event.target.value.replace(/\D/g,'');
  }

  buscarCodigo(): void {
    this.productService.getProduct(this.barcode).subscribe( (response: Response) => {
      if (response.code == 0) {
        this.panelOpenState = false; 
        this.secondPanelExpanded = true;
        this.retrievedProduct = new Product(response.data.nombre, response.data.precio, 1, response.data.categoria, response.data.urlImagen, response.data.idProducto, response.data.peso);
        this.agregarProducto(); 
      } else { //producto no encontrado
        this.snackbar.openFromComponent(SnackbarComponent, {
          duration: 1.5 * 1100,
          data: response,
          panelClass: ['error']
        });
        this.barcodeInput.nativeElement.focus();
        this.barcode = "";
        this.busquedaFormElement.resetForm();
      }
    })
  }

  buscarCodigoAutomatico(pastedText): Observable<Object> {
    return this.productService.getProduct(pastedText);
  }

  regresar(): void {
    setTimeout( () => {
      this.barcodeInput.nativeElement.focus();
      this.busquedaFormElement.resetForm();
    }, 100)
  }

  descartar(): void {
    this.panelOpenState = true; 
    this.secondPanelExpanded = false; 
    this.barcode = ''
  }

  limpiarVenta(): void {
    this.productos = [];
    localStorage.setItem("productos", JSON.stringify([]));
    setTimeout( () => {
      this.barcodeInput.nativeElement.focus();
      this.busquedaFormElement.resetForm();
    }, 100)
  }

  ventaFinalizada(stepper, busquedaForm: NgForm): void {
    stepper.reset(); 
    busquedaForm.resetForm();
    this.descartar();
    this.limpiarVenta();
  }

  onNext(stepper): void {
    if (this.productos.length > 0) {
      stepper.next();
    } else { //show snackbar advirtiendo que debe ingresar al menos 1 producto
      const data = {
        code: 1,
        data: 'Debe agregar un producto al carrito para poder continuar'
      }
      this.snackbar.openFromComponent(SnackbarComponent, {
        duration: 1.5 * 1100,
        data: data,
        panelClass: ['error']
      });
    }
  }

  toggleEditing(): void {
    this.isEditingDescuento = true;
    setTimeout( () => {
      this.inputEditDescuento.nativeElement.focus();
    }, 100)
  }

  editDescuento(value: String, medioDePago: MetodoPagoInterface): void {
    medioDePago.porcentajeOriginal = medioDePago.porcentajeDescuento;
    medioDePago.porcentajeDescuento = Number(value);
    this.isEditingDescuento = false;
  }

  preventNewWindow(event): void {
    if( event.keyCode == 13 || event.keyCode == 17 || event.keyCode == 74 ) {
      event.preventDefault();
    }
  } 

  usuarioEscribio = true;
  isUserInput() {
    this.usuarioEscribio = false;
  }
  dtUserInput() {
    if (this.usuarioEscribio) this.usuarioEscribio = false;

  }
  automaticSearchBarcode(event, value?:string): void {
    let pastedText = event.clipboardData ?  event.clipboardData.getData('text'): value;
    if (!isNaN(pastedText.trim().replaceAll(" ", "")) && (pastedText.length == 13 || pastedText.length == 15)) {
      this.buscarCodigoAutomatico(pastedText.replaceAll(" ", "")).subscribe( (response: Response) => {
        if (response.code == 0) {
          this.retrievedProduct = new Product(response.data.nombre, response.data.precio, 1, response.data.categoria, response.data.urlImagen, response.data.idProducto, response.data.peso);
          this.agregarProducto();      
          setTimeout(() => {
            this.barcode = "";
          }, 600);
        } else {
          this.snackbar.openFromComponent(SnackbarComponent, {
            duration: 1.5 * 1100,
            data: response,
            panelClass: ['error']
          });
          this.barcodeInput.nativeElement.focus();
          this.barcode = "";
        }
      });
    }
  }

  toggleShake(hasShake): String {
    if (hasShake)  {
      var shakeInterval = setInterval( () => {
        if (this.periodToShake != 0)
          this.periodToShake -= 1;
        else {
          clearInterval(shakeInterval);
        }
      }, 1000)
      if (this.periodToShake != 0)
      return 'shake';
      else {
        clearInterval(shakeInterval);
        return 'noShake';
      }
    }
    clearInterval(shakeInterval);
    return 'noShake';
  }

  confirmarVenta(): void {
    this.salesService.nuevaVenta(new Sale(this.productos, this.genero, new Date().toLocaleString(), this.authService.decodePayload().idUsuario, this.comentario, this.medioDePago, this.getTotalNeto()))
    .subscribe( (response: Response) => {
      if (response.code === 0) {
        this.idVenta = response.data;
        localStorage.removeItem("productos");
        this.stepper.next();
      } else {
        this.snackbar.openFromComponent(SnackbarComponent, {
          duration: 1.5 * 1100,
          data: response,
          panelClass: ['error']
        });
      }
    })
  }
}
