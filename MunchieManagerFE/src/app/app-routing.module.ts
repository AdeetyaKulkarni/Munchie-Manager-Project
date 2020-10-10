import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from "./main-page/main-page.component";
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
                          { path: "", component: MainPageComponent },
                          { path: "login", component:LoginPageComponent},
                          { path: "register", component:RegistrationComponent}
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
