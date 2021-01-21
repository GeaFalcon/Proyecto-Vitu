import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../service/login.service';
import { Registro } from 'src/app/models/registro';
import { ApisService } from 'src/app/service/apis.service';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.component.html",
  styleUrls: ["./perfil.component.scss"],
})
export class PerfilComponent implements OnInit {

  editForm:FormGroup
  public userData: any;

  constructor(private valor:LoginService, private Api: ApisService, private fb:FormBuilder, private toastr: ToastrService) {
    this.buildForm();

  }


  showSuccess() {
    this.toastr.success('¡Datos modificados exitosamente!');
  }
  showWarning() {
    this.toastr.error('¡La contraseña no coincide!');
  }

  buildForm() {
    this.Api.getUser(this.getValor()[0].user_id).subscribe((data) =>{
      this.userData = data[0];
      this.editForm = this.fb.group(
        {
          nickname: new FormControl(this.userData.nickname, [
            Validators.minLength(4),
            Validators.maxLength(12),
            Validators.required
          ]),
          name: new FormControl(this.userData.name, [
            Validators.minLength(2),
            Validators.maxLength(20),
            Validators.required
          ]),
          sex: new FormControl(this.userData.sex),
          email: new FormControl(this.userData.email, [
            Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}"),
            Validators.required
          ]),
          password1: new FormControl("", [
            Validators.minLength(8)
          ]),
          password2: new FormControl("", [Validators.required,Validators.minLength(8)]),
          place: new FormControl(this.userData.place, Validators.required),
          photo:new FormControl(this.userData.photo),
          aboutYou:new FormControl(this.userData.aboutYou)
        }
      );
    })
    
  }

  getValor(){
    return this.valor.getUser();
  }

  getUser() {
    return this.Api.getUser(this.getValor()[0].user_id).subscribe((data) => {
      
      this.userData = data[0];
      console.log(this.userData)
    })
  }

  editUser(name: string, nickname: string, place: string, password: string, email: string, photo:string, aboutYou: string, password2:string){
    if(password==""){
      password=password2
    }
    console.log(typeof(password))
    let edit= new Registro;
    edit.name=name;
    edit.nickname=nickname;
    edit.place=place;
    edit.password=password;
    edit.email=email;
    edit.photo=photo;
    edit.aboutYou=aboutYou;
    edit.user_id= this.getValor()[0].user_id;
    console.log(edit)
    if (password2!==this.userData.password){
      this.showWarning()
    }else{
      return this.Api.putUser(edit).subscribe((data) =>{
        this.showSuccess()
        this.getUser();
      })
    }
    
  }
  ngOnInit():void {
  }
}
