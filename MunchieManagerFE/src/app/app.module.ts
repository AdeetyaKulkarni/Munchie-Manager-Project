import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { MainPageComponent } from "./main-page/main-page.component";
import { LoginPageComponent } from './login-page/login-page.component';
import { HeaderComponent } from './header/header.component';
import { RegistrationComponent } from './registration/registration.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { InventoryManagerComponent } from './inventory-manager/inventory-manager.component';
import { GoodTrendsComponent } from './good-trends/good-trends.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RestaurantTrendsComponent } from './restaurant-trends/restaurant-trends.component';
import { ReportingComponent } from './reporting/reporting.component';
import { MenuCreationComponent } from './menu-creation/menu-creation.component';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { MatNativeDateModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginPageComponent,
    HeaderComponent,
    RegistrationComponent,
    ManagerDashboardComponent,
    InventoryManagerComponent,
    GoodTrendsComponent,
    DashboardComponent,
    RestaurantTrendsComponent,
    ReportingComponent,
    MenuCreationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTabsModule,
    MatToolbarModule,
    MatListModule,
    ChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    ThemeService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
