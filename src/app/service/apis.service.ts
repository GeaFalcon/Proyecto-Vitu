import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Registro, Libro } from './../models/registro';
import { Title } from '@angular/platform-browser';
import { Peticiones, RequestModel } from '../models/peticiones';
import { Favorites } from './../models/favorites';

@Injectable({
  providedIn: 'root'
})

export class ApisService {

  private url="http://localhost:3000/user";
  private url2="http://localhost:3000/favorites";
  private url3="http://localhost:3000/requested";
  private url4="http://localhost:3000/mybook";
  private url5="http://localhost:3000/petition";
  private url6="http://localhost:3000/book";
  private url7="http://localhost:3000/books";
  private url8="http://localhost:3000/userbook";
  private url9="http://localhost:3000/books/title";
  private url10="http://localhost:3000/books/author";
  
  constructor(private http: HttpClient) { }
//registro
  postUser(nuevoUser: Registro) {
    return this.http.post(this.url, nuevoUser)
  }

// Editar perfil

  getUsers(){
    return this.http.get(this.url)
  }

  getUser(userId: number) {
    return this.http.get(this.url + "/" + userId)
  }

  putUser(editUser: Registro) {
    return this.http.put(this.url, editUser)
  }

//favoritos
  getFavorites(user: any) {
    return this.http.get(this.url2 + "/" + user)
  }

  postFavorites(userBook:Favorites){
    return this.http.post(this.url2,userBook)
  }

  deleteFavorites(favId:any){
    const options={headers:new HttpHeaders({
      'Content-Type':'application/json'
    }),
    body:{favorites_id:favId},
  }
    return this.http.delete(this.url2,options)
  }
  
//Mis-Libros
  getBook(user_id:number){
    return this.http.get(this.url4+"/"+user_id)
  }
  
  postBook(nuevoLibro:Libro) {
  return this.http.post(this.url6, nuevoLibro)
  }

  getModifica(book_id:number){
    return this.http.get(this.url6+"/"+book_id)
  }

  putBook(libModificado:Libro)
  {
    return this.http.put(this.url6,libModificado)
  }

  deleteBook(bookId:number)
  {
    const options={headers:new HttpHeaders({
      'Content-Type':'application/json'
    }),
    body:{book_id:bookId},
    }
  return this.http.delete(this.url6, options)
  }

//Peticiones
  getPetition(user_id: number) {
    return this.http.get(this.url5 + "/" + user_id)
  };

  postPetition(peticion: Peticiones){
    return this.http.post(this.url5, peticion)
  };

  deletePetition(id: number) {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { requested_id: id },
    }

    return this.http.delete(this.url5, options);
  };

  getUserBook(id:number){
    return this.http.get(this.url8+"/"+id)
  }
  postUserBook(userbook:Favorites){
    return this.http.post(this.url8,userbook)
  }
  //mostrar libro

  getLibro(id: Number) {
    return this.http.get(this.url6 + "/" + id);
  }
  getLibros() {
    console.log(this.http.get(this.url));
    return this.http.get(this.url6);
  }
  gettype(type) {
    console.log(this.http.get(this.url7 + "/" + type));
    return this.http.get(this.url7 + "/" + type);
  }
  getBookTitle(title:string){
    return this.http.get(this.url9 +"/"+ title)
  }
  getBookAuthor(author:string){
    return this.http.get(this.url10 +"/"+ author)
  }
//Solicitudes
  getRequest(id:number){
    return this.http.get(this.url3 + "/" + id);
  }

  putRequest(request:RequestModel){
    return this.http.put(this.url3,request);
  }

  deleteRequest(id:number){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { requested_id: id },
    }
    return this.http.delete(this.url3, options)
  }
}


