import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { MostrarLibrosComponent } from "./pages/mostrar-libros/mostrar-libros.component";
import { PerfilComponent } from "./pages/perfil/perfil.component";
import { FavoritosComponent } from "./pages/favoritos/favoritos.component";
import { MisLibrosComponent } from "./pages/mis-libros/mis-libros.component";
import { SolicitudesComponent } from "./pages/solicitudes/solicitudes.component";
import { LoginComponent } from "./pages/login/login.component";
import { NavComponent } from "./pages/nav/nav.component";
import { PeticionesComponent } from "./pages/peticiones/peticiones.component";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './pages/footer/footer.component';
import { PipesModule } from './pipes/pipes.module';
@NgModule({
  declarations: [
    AppComponent,
    MostrarLibrosComponent,
    PerfilComponent,
    FavoritosComponent,
    MisLibrosComponent,
    SolicitudesComponent,
    LoginComponent,
    NavComponent,
    PeticionesComponent,
    FooterComponent,
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    PipesModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
