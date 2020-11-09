import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;
  isAuth: Boolean;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    
  }

  formSubmitted: boolean = false;
  serviceNotDone: boolean = false;

  login(formLogin: NgForm) {
    this.formSubmitted = true;
    if (formLogin.valid) {
      this.serviceNotDone = true;
      this.authService.login(this.userName, this.password).then(res=>{
        this.router.navigate(["/radies"]);
        formLogin.reset();
        this.serviceNotDone = false;
      });
      this.formSubmitted = false;
    }
    
  }
}
