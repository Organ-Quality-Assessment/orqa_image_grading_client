import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash'
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { List } from 'postcss/lib/list';
import { map } from 'rxjs/operators';

interface ListResponse {
  data: any;
  meta: any;
}

@Injectable({
  providedIn: 'root'
})
export class GradingService {
  private URL = environment.strapi_url 
  constructor(private http: HttpClient) {}

  imagesToGrade(organ: String) {
    // todo generate list of n images from selected organ type ensuring even distribution of graders
    // todo get images fron server or strapi from Oracle
    // for now get all images direct from strapi



  }

  // submitLiverScore(quality: number, transplantable: boolean, image: any) {
    
  //   const headers = new HttpHeaders({
  //     'Authorization': 'Bearer ' + this.getSession().token,
  //     'content-type': 'application/json'
  //   })

  //   const data = {
  //     data: {
  //       quality,
  //    transplantable,
  //    image
  //     }     
  //  }

  

  //   // return this.http.post(this.URL + '/liver-scores', data, {headers: headers}).pipe(map(res => res))
  //   return this.http.post(this.URL + '/scores', data, {headers: headers})
  // }

  submitScore(perfusion: any, steatosis: any, transplantable: boolean, image: any) {
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getSession().token,
      'content-type': 'application/json'
    })


    const data = {
      data: {
       steatosis,
       perfusion,
     transplantable,
     image
      }     
   }
   console.log(data)

    // return this.http.post(this.URL + '/liver-scores', data, {headers: headers}).pipe(map(res => res))
    return this.http.post(this.URL + '/scores', data, {headers: headers})
  }

  async getListOfAllImages():Promise<ListResponse> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getSession().token
    })
    const params = new HttpParams().set('populate', '*')
    const options = {headers: headers, params}

    const get = this.http.get<ListResponse>(this.URL + '/images', options)
    return await lastValueFrom(get)
  }

  async getImagesToGrade(organs) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getSession().token
    })
    const params = new HttpParams().set('organs', organs)
    const options = {headers: headers, params}

    const get = this.http.get(this.URL + '/images/imagesToGrade', options)
    return await lastValueFrom(get)
  }




  getSession() {
    // todo if these items are not there or token is expired, redirect to login
    return {
      token: localStorage.getItem('orqa_token'),
      id: localStorage.getItem('orqa_id')
    }
  }

  
}
