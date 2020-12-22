import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_URL } from '../../configVariables';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProduct(idProducto) {
    const params = new HttpParams().set('idProducto', idProducto);
    return this.http.get(`${BASE_URL}/api/product`, { params: params });
  }
}
