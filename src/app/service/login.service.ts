import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './../models/login';
import { isNullOrUndefined } from 'util'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  public check:boolean=false;
  public userId:any;
  private url="http://localhost:3000/user/login"
  
  constructor(private http:HttpClient) {
   }

  authLogin(login:Login){
    return this.http.post(this.url, login)
  }

  setUser(user){
    let user_local=JSON.stringify(user);
    localStorage.setItem("currentUser",user_local)
  }

  getUser(){
    let user_local=localStorage.getItem("currentUser")
    if (!isNullOrUndefined(user_local)){
      let user = JSON.parse(user_local);
      this.userId=user;
      return user;
      
    }else{
      return null;
    }
  }

  logOut(){
    localStorage.removeItem("currentUser")
  }
}
