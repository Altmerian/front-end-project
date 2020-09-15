import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return '$' + value.toFixed(2);
  }
}
