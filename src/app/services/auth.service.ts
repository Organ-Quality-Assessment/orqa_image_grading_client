import { Injectable, ɵɵsetComponentScope } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';

interface AuthResponse {
  jwt: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // keep track of requested page
  public redirectPage: String;


  private authURL = environment.strapi_url + '/auth/local'

  constructor(private http: HttpClient, private router: Router) {}

  // todo add error handling

  getRedirectPage() {
    return this.redirectPage;
  }

  setRedirectPage(newPage: String) {
    this.redirectPage = newPage
  }

  register(email: string, password: string, username: string, name: string,
    institution: any, job: any, experience: any, task: any,
    liver: boolean, pancreas: boolean, kidney: boolean, thoracic: boolean, contactable: boolean) {
   
   const data = {
    email,
      password,
      username,
      name,
      institution,
      job,
      experience,
      task,
      liver,
      pancreas,
      kidney,
      thoracic,
      contactable
   }
  
      return this.http.post(this.authURL + '/register', {
        email,
        password,
        username,
        name,
        institution,
        job,
        experience,
        task,
        liver,
        pancreas,
        kidney,
        thoracic,
        contactable
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
    // tokens last 30 days
   let expireAt = new Date()
    expireAt.setDate(expireAt.getDate() + 3)
    localStorage.setItem('orqa_expire', expireAt.toString())
  }

  endSession() {
    localStorage.removeItem('orqa_token')
    localStorage.removeItem('orqa_id')
    localStorage.removeItem('orqa_expire')
   

  }

  logout() {
    this.endSession()
    this.router.navigate(['register'])
  }
  
}
