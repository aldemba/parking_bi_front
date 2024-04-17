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

    return items.filter(item => {
      // Rechercher si le terme est inclus dans les champs spécifiques
      return (
        this.checkContains(item.nom, searchTerm) ||
        this.checkContains(item.marque, searchTerm) ||
        this.checkContains(item.modele, searchTerm) 

        // Ajoutez d'autres champs si nécessaire
      );
    });
  }

  checkContains(value: string, term: string): boolean {
    return value.toLowerCase().includes(term);
  }
}
