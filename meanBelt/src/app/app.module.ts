import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./auth.guard";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CookieModule } from "ngx-cookie";
import { EqualValidator } from './equal-validator.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemService } from "./services/item.service";
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EqualValidator,
    DashboardComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    CookieModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
