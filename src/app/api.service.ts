import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlService } from './url.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private urlService: UrlService, private router: Router) { }

  private headers = new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem("token") });

  checkToken(res): void {
    if (res.status === 401) {
      localStorage.removeItem("token");
      this.router.navigate(["/"]);
      window.alert("Kullanıcı izni geçersiz!");
    }
  }

  //Login service 
  checkUser(username: string, password: string) {
    const user = {loginName: username, password: password};

    return this.http.post(this.urlService.getUrl(this.urlService.endpoints.auth), user).toPromise()
        .then(res=>{
          localStorage.setItem("token", res["data"].token);})
        .catch(res=>{
          console.log("Hebele", res);
          localStorage.removeItem("token");})
  }
}
