import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MostrarLibrosService {
  private url = "http://localhost:3003/book";
  constructor(private http: HttpClient) {}

  // getLibro(id: Number) {
  //   return this.http.get(this.url + "/" + id);
  // }
  // getLibros() {
  //   console.log(this.http.get(this.url));
  //   return this.http.get(this.url);
  // }
  // gettype(type) {
  //   console.log(this.http.get(this.url + "/" + type));
  //   return this.http.get(this.url + "/" + type);
  // }
}
