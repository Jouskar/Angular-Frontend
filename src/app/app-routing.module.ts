import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { ListComponent } from './list/list.component';

const routes: Routes= [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: 'radies',
    //canActivate: [AuthGuard],
    component: ListComponent
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { useHash: true })]
})
export class AppRoutingModule { }
