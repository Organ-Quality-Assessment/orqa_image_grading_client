import { Injectable, ɵɵsetComponentScope } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { User } from './models/user';

interface AuthResponse {
  jwt: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = environment.strapi_url + '/auth/local'

  // login(email: string, password: string) {
    
    
  //   return this.http.post<AuthResponse>(this.authURL, { identifier, password });
  // }

  register(email: string, password: string, username: string) {
    console.log(email)
    axios.post(this.authURL + '/register', {
      email,
      password,
      username
    })
    .then(response => {
      const returned: AuthResponse = {
        jwt: response.data.jwt,
        user: response.data.user
      }
      console.log(returned)
      return returned
    })
    .catch(error => {
      // todo set up error service and do not progress to next page
      console.log(error)
    })
    
  }

  checkIfLoggedIn() {
   // todo
  }   
  
}
