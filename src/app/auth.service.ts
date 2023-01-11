import { Injectable, ɵɵsetComponentScope } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { User } from './models/user';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

interface AuthResponse {
  jwt: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  


  private authURL = environment.strapi_url + '/auth/local'

  constructor(private http: HttpClient) {}

  // login(email: string, password: string) {
    
    
  //   return this.http.post<AuthResponse>(this.authURL, { identifier, password });
  // }


  register(email: string, password: string, username: string) {
    return this.http.post(this.authURL + '/register', {
       email,
      password,
      username
    })
  }

  login(identifier: string, password: string) {
    return this.http.post<AuthResponse>(this.authURL, { identifier, password });
  }

  isLoggedIn() {
   if (localStorage.getItem('orqa_token')) {
    return true
   } else {
    return false
   }
  }   

  setSession(authResult: { jwt: string; user: User }) {
    localStorage.setItem('orqa_token', authResult.jwt)
    localStorage.setItem('orqa_id', authResult.user.id)
  }

  endSession() {
    localStorage.removeItem('token')
    // todo log user out
  }
  
}
