import { Component, OnInit, TemplateRef } from '@angular/core';
import { LoginService } from './../../service/login.service';
import { ApisService } from './../../service/apis.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { Peticiones } from 'src/app/models/peticiones';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {

  modalRef: BsModalRef;
  public fav:any=[];
  public userbook:any=[];
  public datosPeticion:any=[];
  public user:number;
  constructor(private valor:LoginService,private api:ApisService,private modalService: BsModalService) {
    this.getPeticion();
   }

  getValor(){
    this.user=this.valor.getUser()[0].user_id;
    return this.valor.getUser();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getFav(){
    let user_id=this.valor.getUser()[0].user_id 
    console.log(JSON.stringify(this.valor.userId) )
    return this.api.getFavorites(user_id).subscribe((data)=>{
      this.fav=data;
      console.log(data)
    }) 
  }
  delFav(favId,index){
    return this.api.deleteFavorites(favId).subscribe((data)=>{
      console.log(data)
      this.fav.splice(index,1)
    })
  }
//Crear peticion

getBookUser(id:number){
  return this.api.getUserBook(id).subscribe((data:any)=>{
    let datos=data
    let i=0
      while((datos[i].user_id==this.valor.getUser()[0].user_id)&&(i<datos.length)){
        datos.splice(i,1)
        i++
        // i<datos.length
      }
      for (let i=0;i<datos.length;i++){
        if(datos[i].user_id==this.valor.getUser()[0].user_id){
          datos.splice(i,1)
        }
      }
    this.userbook=datos;
    console.log(datos)
  })
}

postPeticion(user_idRequest:any){
  let variable = new Peticiones;
  variable.user_idRequest = user_idRequest.substr(0,1);
  variable.book_id = this.userbook[0].book_id;
  variable.user_id = this.valor.getUser()[0].user_id;
  variable.status = "Pendiente";
  let existe=false;
  console.log(existe);
  for(let i = 0;i<this.datosPeticion.length;i++){
    if((this.datosPeticion[i].user_idRequest==user_idRequest.substr(0,1)) && (this.datosPeticion[i].book_id==this.userbook[0].book_id)){
      existe=true;
    }console.log(this.datosPeticion[i].user_idRequest)
    console.log(user_idRequest.substr(0,1))
  }
  console.log(existe);
  if(!existe){
    return this.api.postPetition(variable).subscribe((data) => {
      //console.log(data);
      this.getPeticion();
    });
  }
  
};

getPeticion(){
  let variable = this.valor.getUser()[0].user_id;
  return this.api.getPetition(variable).subscribe((data) => {
      this.datosPeticion = data;
      console.log(data)
    }
  );
}

tienePeticion(idBook:number){
  let i=0;
  let existe=false
  while(i<this.datosPeticion.length){
    if(this.datosPeticion[i].book_id==idBook){
      existe=true
      let status=this.datosPeticion[i].status
      return status
    }
    i++
  }
  return existe; 
}

  ngOnInit():any {
    this.getFav();
  }


}
