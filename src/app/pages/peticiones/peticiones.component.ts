import { Component, OnInit, TemplateRef } from '@angular/core';
import { LoginService } from './../../service/login.service';
import { ApisService } from 'src/app/service/apis.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap";

@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.scss']
})

export class PeticionesComponent implements OnInit {
  modalRef: BsModalRef;
  public datosPeticion: object[] = [];
  public user: any;

  constructor(private modalService: BsModalService, private valor: LoginService, private api: ApisService) { }

  getValor() {
    return this.valor.getUser();
  }

  /* --------------------- Método para obtener los datos del usuario --------------------- */
  getUser(user_id: number) {
    return this.api.getUser(user_id).subscribe((data) => {
      this.user = data[0];
      console.log(this.user)
    })
  }

  getPeticion() {
    let variable = this.valor.getUser()[0].user_id;
    return this.api.getPetition(variable).subscribe((data: object[]) => {
      this.datosPeticion = data;
      console.log(data)
    }
    );
  }

  deletePeticion(variable, indice) {
    return this.api.deletePetition(variable).subscribe((data) => {
      console.log(data);
      this.datosPeticion.splice(indice, 1);
    }
    );
  }

  // ---------------------------- Método para abrir modal
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  /* --------------------- Método para obtener los datos del usuario --------------------- */
  colorPetition(petClass) {
    let color: string;

    if (petClass == "Aceptada") {
      color = "success";
    }

    else if(petClass == "Rechazada") {
      color = "danger";
    }

    return color;
  }

  ngOnInit() {
    this.getPeticion();
  }
}
