import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { reject } from "q";

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private url = "http://127.0.0.1:8000"

  public endpoints = { auth: 'api-token-auth', movie: 'radies' };

  constructor(private http: HttpClient, private router: Router) { }

  getUrl(endpoint?: string, id?:string):string {
    if (endpoint) {
      if (id) {
        return this.url + "/" + endpoint + "/" + id;
      }
      return this.url + "/" + endpoint;
    }
    return this.url;
  }

  checkToken(res): void {
    if (res.status === 401) {
      localStorage.removeItem("token");
      this.router.navigate(["/"]);
      window.alert("Kullanıcı izni geçersiz!");
    }
  }


  getHeaders() {
    return new HttpHeaders({ 'Authorization': 'Bearer '+localStorage.getItem("token") });
  }

  public httpDelete(endpoint: string, id?:string): Promise<any> {
    return this.http.delete(this.getUrl(endpoint, id), { headers: this.getHeaders() }).toPromise()
        .then(res => {
          console.log("success",res);
          return res;
        }).catch(res => {
          console.log("Eyvah", res);
          this.checkToken(res);
          return reject(res.error.message);      
        });
  }

  public httpPut(endpoint: string, body, id?:string): Promise<any> {
    return this.http.put(this.getUrl(endpoint, id), body, { headers: this.getHeaders() }).toPromise()
        .then(res => {
          console.log("success",res);
          return res;
        }).catch(res => {
          console.log("Eyvah", res);
          this.checkToken(res);
          return reject(res.error.message);      
        });
  }

  public httpPost(endpoint: string, body): Promise<any> {
    return this.http.post(this.getUrl(endpoint), body, { headers: this.getHeaders() }).toPromise()
        .then(res => {
          console.log("success",res);
          return res;
        }).catch(res => {
          console.log("Eyvah", res);
          this.checkToken(res);
          return reject(res.error.message);      
        });
  }

  public httpGet(endpoint: string): Promise<any> {
    console.log('headers', this.getHeaders());
    return this.http.get(this.getUrl(endpoint), { headers: this.getHeaders() }).toPromise()
        .then(res => {
          console.log("success",res);
          return res;
        }).catch(res => {
          console.log("Eyvah", res);
          this.checkToken(res);
          return reject(res.error.message);      
        });
}

  //Login service 
  checkUser(username: string, password: string) {
    const user = {loginName: username, password: password};

    return this.http.post(this.getUrl("session"), user).toPromise()
        .then(res=>{
          localStorage.setItem("token", res["data"].token);})
        .catch(res=>{
          console.log("Hebele", res);
          localStorage.removeItem("token");})
  }

  public returnResponse(res) {
    if (res.status === 200) {
        let body;
        try {
            body = JSON.parse(res._body);
        } catch (error) {
            body = res._body;
        }

        return body.data || body || {};
    } else {
        return reject('Something bad happened; please try again later.');
    }
  }

  private handleError(error) {    
    console.log('error handler', error);
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
    } else {
        this.checkToken(error);
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
    }
    let errorBody
    try {
        errorBody = JSON.parse(error._body);
    } catch (error) {
        errorBody = error._body;
    }
    // return an observable with a user-facing error message
    return reject(errorBody.message || 'Something bad happened; please try again later.');
};
}
