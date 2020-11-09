import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ListComponent } from './list/list.component';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard, 
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
