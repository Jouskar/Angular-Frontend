import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) {}

  isAuthenticated() {
      const promise = new Promise((resolve, reject) => {
          resolve(localStorage.getItem("token"));
      });
      return promise;
  }

  login(userName, password) {
    return this.apiService.checkUser(userName, password);
  }


}
