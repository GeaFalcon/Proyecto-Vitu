import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MostrarLibrosComponent } from "./pages/mostrar-libros/mostrar-libros.component";
import { PerfilComponent } from "./pages/perfil/perfil.component";
import { FavoritosComponent } from "./pages/favoritos/favoritos.component";
import { MisLibrosComponent } from "./pages/mis-libros/mis-libros.component";
import { SolicitudesComponent } from "./pages/solicitudes/solicitudes.component";
import { LoginComponent } from "./pages/login/login.component";
import { NavComponent } from "./pages/nav/nav.component";
import { PeticionesComponent } from "./pages/peticiones/peticiones.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "perfil", component: PerfilComponent },
  { path: "mostrarLibro", component: MostrarLibrosComponent },
  { path: "favoritos", component: FavoritosComponent },
  { path: "misLibros", component: MisLibrosComponent },
  { path: "solicitudes", component: SolicitudesComponent },
  { path: "login", component: LoginComponent },
  { path: "peticiones", component: PeticionesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
