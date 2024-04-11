import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter(item =>
      Object.keys(item).some(key => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm);
        }
        return false;
      })
    );
  }
}
