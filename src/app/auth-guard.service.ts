import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        return this.authService.isAuthenticated()
            .then((authenticated: string)=> {
                console.log(authenticated);
                if(authenticated) {
                    return true;
                }else{
                    window.alert("Hatalı Giriş");                    
                    this.router.navigate(["/"]);
                    return false;
                }
            });
    }
}