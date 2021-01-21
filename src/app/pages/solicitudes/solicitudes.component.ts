import { Component, OnInit, TemplateRef } from '@angular/core';
import { LoginService } from './../../service/login.service';
import { ApisService } from 'src/app/service/apis.service';
import { RequestModel } from 'src/app/models/peticiones';
import { BsModalService, BsModalRef } from "ngx-bootstrap";

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {
  modalRef: BsModalRef;
  public user: any;
  public request:any;
  public bookUserRequest: any;
  constructor(private modalService: BsModalService, private valor:LoginService, private api:ApisService) { }

  // ---------------------------- Método para abrir modal
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  /* --------------------- Método para obtener los datos del usuario --------------------- */
  getUser(user_id: number){
    return this.api.getUser(user_id).subscribe((data) => {
      this.user = data[0];
      console.log(this.user)
    })
  }
  
  getValor(){
    // console.log(this.valor.getUser())
    return this.valor.getUser();

  }

  getSolicitud(){
    let id=this.valor.getUser()[0].user_id;
    return this.api.getRequest(id).subscribe((data)=>{
      this.request=data;
      console.log(data);
    })
  }
  putSolicitud(id){
    let requestPut=new RequestModel;
    requestPut.status="Aceptada";
    requestPut.requested_id=id;
    return this.api.putRequest(requestPut).subscribe((data)=>{
      console.log(data);
      this.getSolicitud();
    })
  }

  putSolicitud2(id,index){
    let requestPut=new RequestModel;
    requestPut.status="Rechazada";
    requestPut.requested_id=id;
    return this.api.putRequest(requestPut).subscribe((data)=>{
      console.log(data);
      this.request.splice(index,1);

    })
  }

  deleteSolicitud(id){
    return this.api.deleteRequest(id).subscribe((data)=>{
      console.log(data)
    })
  }

  colorRequest(reqClass) {
    let color: string;

    if (reqClass == "Aceptada") {
      color = "success";
    }
    return color;
  }
// ---------------Funcion para traer los libros de la persona que te pide ------------------//
  getBookUserRequest(id){
    return this.api.getBook(id).subscribe((data)=>{
      this.bookUserRequest = data;
    })
  }

  ngOnInit() {
    this.getSolicitud();
  }

}
