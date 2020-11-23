import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CustomerDasboardComponent } from './customer-dasboard/customer-dasboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GoodTrendsComponent } from './good-trends/good-trends.component';
import { InventoryManagerComponent } from './inventory-manager/inventory-manager.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from "./main-page/main-page.component";
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { MenuCreationComponent } from './menu-creation/menu-creation.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReportingComponent } from './reporting/reporting.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { RestaurantTrendsComponent } from './restaurant-trends/restaurant-trends.component';

const routes: Routes = [
  { path: "", component: MainPageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "register", component: RegistrationComponent },
  {
    path: "dashboard", component: DashboardComponent, children: [
      { path: "manager-dashboard", component: ManagerDashboardComponent },
      { path: "inventory-manager", component: InventoryManagerComponent },
      { path: "good-trends", component: GoodTrendsComponent },
      { path: "restaurant-trends", component: RestaurantTrendsComponent },
      { path: "reporting", component: ReportingComponent },
      { path: "menu-creation", component: MenuCreationComponent },
    ]
  },
  { path: "customer-dashboard", component: CustomerDasboardComponent},
  { path: "restaurant-menu/:id", component: RestaurantMenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
