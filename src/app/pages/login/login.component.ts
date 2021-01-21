import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApisService } from './../../service/apis.service';
import { Login } from './../../models/login';
import { LoginService } from './../../service/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { passValidation } from "./custom-validator";
import { Registro } from './../../models/registro';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // styles: ["input.ng-valid{border:2px solid #38a9b8;}"]
})
export class LoginComponent implements OnInit {

  public user: any;
  loginForm: FormGroup;
  registroForm: FormGroup;
  public miRegistro: Registro;
  public users: Registro[];
  public container: string = "container";

  constructor(private fb: FormBuilder, public auth: LoginService, private router: Router, private toastr: ToastrService, private ApiUser: ApisService, private api: ApisService) {
    this.buildForm();
    this.getUsers();
  }

  signIn() {
    this.container = "container";
  }

  signUp() {
    this.container = "container right-panel-active"
  }

  /* Mensaje de error inicio de sesión */
  showWarning() {
    this.toastr.error('¡La contraseña o el nickname no coinciden!');
  }

  /* Mensajes de registro */
  showSuccess() {
    this.toastr.success('¡Usuario registrado exitosamente!');
  }
  showWarningNickname() {
    this.toastr.error('¡Nickname ya existe!');
  }
  showWarningEmail() {
    this.toastr.error('¡Email ya registrado!');
  }

  //Validaciones parte front
  buildForm() {
    this.loginForm = this.fb.group({
      nickname: new FormControl(null, Validators.required),
      pass: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })

    this.registroForm = this.fb.group({
      nickReg: new FormControl(null, [
        Validators.minLength(4),
        Validators.maxLength(12),
        Validators.required
      ]),
      name: new FormControl(null, [
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.required
      ]),
      // sexo: new FormControl(),
      email: new FormControl(null, [
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}"),
        Validators.required
      ]),
      place: new FormControl("", Validators.required),
      passReg: new FormControl("", [
        Validators.pattern("(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}"),
        Validators.required
      ]),
      pass2: new FormControl("", [Validators.required])

    },
      { validators: passValidation.matchPass }
    );
  }

  // onSubmit() {
  //   console.log(this.loginForm.value)
  // }

  /* Trae los usuarios de la base de datos */
  getUsers() {
    return this.api.getUsers().subscribe((data: Registro[]) => {
      this.users = data;
      console.log(data)
    })
  }

  //Para la autentificacion y redirigir a las paginas
  authLogin2(nick: string, pass: string) {
    let login = new Login;
    login.nickname = nick;
    login.password = pass;
    this.auth.authLogin(login).subscribe((data) => {
      this.auth.userId = data;
      //console.log(this.auth.userId)
      if (this.auth.userId[0] === undefined) {
        this.router.navigate(['/login'])
        this.showWarning()
        console.log(data)
      } else {
        this.auth.check = true
        this.auth.setUser(data)
        this.router.navigate(['/mostrarLibro'])
      }
      console.log(this.auth.check)
    })
  }

  // Añadir usuario
  addUser(nick: string, name: string, email: string, place: string, pass: string) {
    let user = new Registro;
    user.nickname = nick;
    user.name = name;
    user.email = email;
    user.place = place;
    user.password = pass;
    console.log(user)
    let check = false
    let check2 = false

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].nickname == nick) {
        check = true
        console.log("holaaa")
      } if (this.users[i].email == email) {
        check2 = true
      }
    }
    if (check === true) {
      this.showWarningNickname();
    }
    if (check2 === true) {
      this.showWarningEmail();
    }
    if ((check == false) && (check2 == false)) {
      return this.ApiUser.postUser(user).subscribe((data) => {
        console.log(data);
        this.signIn();
        this.showSuccess();
      })
    } else {
      console.log("Error desconocido")
    }
  }


  ngOnInit(): void {
  }
}
