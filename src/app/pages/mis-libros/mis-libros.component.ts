import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../service/login.service';
import { ApisService } from 'src/app/service/apis.service';
import { Libro } from 'src/app/models/registro';
import { Favorites } from './../../models/favorites';

@Component({
  selector: 'app-mis-libros',
  templateUrl: './mis-libros.component.html',
  styleUrls: ['./mis-libros.component.scss']
})
export class MisLibrosComponent implements OnInit {
  
  public misLibros: Libro[]=[]
  public editarLibro=new Libro  //para mostrar datos del libro en el modal de modificar

  constructor(private valor:LoginService, private Api: ApisService) { }

  getValor(){
    return this.valor.getUser();
  }


//-----------------------------------------------
  //Mis-Libros
  
  verLibro(){
    let userLog=this.valor.getUser()[0].user_id
    return this.Api.getBook(userLog).subscribe((data:Libro[])=>
    {
      this.misLibros=data
      console.log(this.misLibros)
    })
  };

  insertarLibro(title:string,author:string,year:number,editorial:string,type:string,photo:string,description:string){
    let userLog=this.valor.getUser()[0].user_id
    let book=new Libro;
    book.title=title;
    book.author=author;
    book.year=year;
    book.editorial=editorial;
    book.type=type; 
    book.description=description;
    book.photo=photo;
    book.user_id=userLog;
    let books;
    let existe=false
    let id;
    this.Api.getLibros().subscribe((data)=>{
      books=data
      console.log(data)
      for (let i=0;i<books.length;i++){
        if((books[i].title==book.title)&&(books[i].author==book.author)&&(books[i].year==book.year)&&(books[i].editorial==book.editorial)){
          existe=true;
          id=books[i].book_id
          console.log(existe)
        }
      }
      if(existe){
        let userBook=new Favorites;
        userBook.user_id=userLog;
        userBook.book_id=id;
      return this.Api.postUserBook(userBook).subscribe((data)=>{
        console.log(data);
        this.verLibro();
      })
      }else{
        return this.Api.postBook(book).subscribe((data)=>{
          console.log(data);
          this.verLibro();
        })
      }
    })
    
    
  };

  modificarLibro(title:string,author:string,year:number,editorial:string,type:string,photo:string,description:string){
    let modificado=new Libro;
    modificado.title=title;
    modificado.author=author;
    modificado.year=year;
    modificado.editorial=editorial;
    modificado.type=type;
    modificado.photo=photo;
    modificado.description=description;
    modificado.book_id=this.editarLibro.book_id
    return this.Api.putBook(modificado).subscribe((data)=>{
      console.log(data);
      this.verLibro();
    })
  };

  //con este método modifico el libro en el modal
  getLibro(bookId){
    return this.Api.getModifica(bookId).subscribe((data)=>{
      this.editarLibro=data[0]
      console.log(this.editarLibro)
    })
  }

  borrarLibro(bookId, indice){
    return this.Api.deleteBook(bookId).subscribe((data)=>{
      console.log(data);
      this.misLibros.splice(indice, 1)
    })
  };

  ngOnInit(){
    this.verLibro()
  };

}
