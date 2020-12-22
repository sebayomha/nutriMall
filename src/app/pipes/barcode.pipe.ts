import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'barcode'})
export class BarcodePipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      const valueCopy = value;
      let primerParte = valueCopy.substring(0,1);
      if (value.length === 1) {
        return `${primerParte}`;
      } else {
        if (value.length === 2 && value[value.length - 1] === " ") {
          return `${primerParte}`;
        }
        let resto = valueCopy.substring(1,value.length).trim();
        if (resto.length > 6) {
          let segundaParte = resto.trim().substring(0,6);
          let terceraParte = resto.substring(6,resto.length).trim();
          return `${primerParte} ${segundaParte} ${terceraParte}`;
        } else {
          return `${primerParte} ${resto}`;
        }
      }
    }
    return '';
  }
}