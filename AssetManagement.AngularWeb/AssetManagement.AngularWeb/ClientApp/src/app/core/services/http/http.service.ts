import { Injectable } from '@angular/core';
import { methods } from 'src/app/constants/constants';
import { AppSettingsDto } from '../../dtos/app-settings-dto';
import { LocalStoreService } from '../local-store.service';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = AppSettingsDto.baseUrl;
  constructor(private localStoreService: LocalStoreService) { }
  requestObj = (method: string = 'GET', headerType: string = 'DEFAULT', body?: any) =>  {
    return {
     method,
     headerType,
     body
   }
  }

  get(url: string):Observable<any> {
    return this.executeRequest(url, this.requestObj(methods.GET,methods.GET));
  }

  post(url: string, body: any):Observable<any> {
    return this.executeRequest(url, this.requestObj(methods.POST, methods.POST, JSON.stringify(body)));
  }

  executeRequest(url:string, requestObj: any):Observable<any> {
    return new Observable((observer: Observer<any>) => {
      let request = this.getFetchObject(requestObj);
      console.log(this.baseUrl + url);
      fetch(this.baseUrl + url, request)
        .then((response:any) => {
          return this.handelResponse(response);
        })
        .then(result => {
          if(!result.status){
            //alart
          }
          observer.next(result);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
          observer.complete();
        });
    })
  }

  getFetchObject(requestObj: any) {
    let headers;
    switch (requestObj.headerType) {
      case methods.POST: {
        headers = this.postHeaders()
        break;
      }
      case methods.GET: {
        headers = this.getHeaders()
        break;
      }
      default: {
        headers =this.getHeaders()
      }
    }
    let request: any = {
      method: requestObj.method, // *GET, POST, PUT, DELETE, etc.
      headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    };
    if (requestObj.body) {
      request.body = requestObj.body;
    }
    return request;
  }

  getBaseHeaders() {
    const token = this.localStoreService.getItem('accessToken');
    let base: any = {};
    if (token) {
      base['Authorization'] = `Bearer ${token}`
    }
    if (AppSettingsDto.apiKey) {
      base['ApiKey'] = AppSettingsDto.apiKey;
    }
    return base;
  }

  getHeaders() {
    let base: any = this.getBaseHeaders();
    base.Accept = 'application/json';
    base.Pragma = 'no-cache';
    base['Cache-Control'] = 'no-cache';
    return base;
  }
  postHeaders() {
    let base: any = this.getBaseHeaders();
    base.Accept = 'application/json';
    base['Content-Type'] = 'application/json';
    return base;
  }

  handelResponse(response: any) {
    if (response.status == 403) {
      return response.json();
    } else if (!response || response.status === 204) {
      return;
    } else if (response && response.status >= 500) {
      throw response;
    } else {
      return response.json()
    }
  }
}
