import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sale } from 'src/app/models/sale';
import { BASE_URL } from '../../configVariables';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }

  getTodaySales() {
    return this.http.get('/api/sales/todaySales');
  }

  
  nuevaVenta(venta: Sale) {
    return this.http.post(`${BASE_URL}/api/sale/newSale`, { params: venta });
  }
}
