import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';

interface ListResponse {
  data: any;
  meta: any;
}

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {
private URL = environment.strapi_url

  constructor(private http: HttpClient) { }


  async getImages() {
    // todo currently getting everything from strapi, but will eventually need to
    // filter to select n images and ensure images are graded evenly
    // and that they come from oracle storage

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getSession().token
    })
    const params = new HttpParams().set('populate', '*')
    const options = {headers: headers, params}

    const get = this.http.get<ListResponse>(this.URL + '/images', options)
    return await lastValueFrom(get)
  }

  getSession() {
    // todo if these items are not there or token is expired, redirect to login
    return {
      token: localStorage.getItem('orqa_token'),
      id: localStorage.getItem('orqa_id')
    }
  }

  submit(image: any, response: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getSession().token,
      'content-type': 'application/json'
    })

    const data = {
      data: {
     image,
     real: response
      }     
   }

    return this.http.post(this.URL + '/comparisons', data, {headers: headers})
  }
}
