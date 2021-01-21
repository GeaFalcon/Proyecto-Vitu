import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(libros: any[],texto: string): any[] {
    
    if(texto === ''){
      return libros
    }
    return libros.filter(item=>{
      return item.title.toLowerCase().includes(texto.toLowerCase()) || item.author.toLowerCase().includes(texto.toLowerCase());
      
    })
  }

}
