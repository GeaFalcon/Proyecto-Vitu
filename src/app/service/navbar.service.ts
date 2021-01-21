import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  
  public status:boolean=false;

  constructor() { }

  // ver(){
  //   return this.status
  // }
  // setVer(value){
  //   this.status=value
  // }
}
