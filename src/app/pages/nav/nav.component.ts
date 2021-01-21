import { Component, OnInit } from "@angular/core";
import { LoginService } from './../../service/login.service';
import { Router } from '@angular/router';
import { ApisService } from './../../service/apis.service';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})

export class NavComponent implements OnInit {

  public dropdown: string = "nav-dropdown-hidden";
  public navList: string = "nav-list-hidden"
  public hamburguer: string;
  public userName:any;
  public navActive : string;
  public navActivePerfil:string

  constructor( private out:LoginService, private router:Router, private api:ApisService,private valor:LoginService) {
    this.getUser()
  }

    // dropdownToggle(){
    //   if (this.dropdown === "nav-dropdown-hidden"){
    //     this.dropdown = "nav-dropdown-toggle"
    //   }

    //   else {
    //     this.dropdown = "nav-dropdown-hidden"
    //   }
    // }

    dropdownMobile(){
      if (this.navList === "nav-list-hidden"){
        this.navList = "nav-list-toggle";
        this.hamburguer = "active"
      }

      else {
        this.navList = "nav-list-hidden";
        this.hamburguer = ""
      }
    }
    getValor() {
      return this.valor.getUser();
    }


    cerrarSesion(){
      this.router.navigate(['/login'])
      return this.out.logOut()
    }

    getUser(){
      let userId=this.getValor()[0].user_id
      return this.api.getUser(userId).subscribe((data)=>{
        console.log(data)
        this.userName=data[0].nickname
      })
    }

    activeNav(){
        this.navActive = 'nav-active'
        this.navActivePerfil = ''
    }
    desactiveNav(){
      this.navActive = ''
      this.navActivePerfil = ''
    }
    activeNavPerfil(){
      this.navActivePerfil = 'nav-active'
    }


  ngOnInit(): void {}
}