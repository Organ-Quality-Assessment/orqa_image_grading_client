import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { any } from 'cypress/types/bluebird';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private URL = environment.strapi_url

  constructor(private http: HttpClient) { }

  getSession() {
    // todo if these items are not there or token is expired, redirect to login
    return {
      token: localStorage.getItem('orqa_token'),
      id: localStorage.getItem('orqa_id')
    }
  }

    submit(photography: any) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.getSession().token,
        'content-type': 'application/json'
      })
  
      const data = {
        data: {
       isPhotographyValuable: photography
        }     
     }
  
      return this.http.post(this.URL + '/questions', data, {headers: headers})
    }
  }

