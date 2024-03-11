import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  constructor() { }

  getItem(key: string) {
    return localStorage.getItem(key);
  }
  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  removeItem(key: string) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
  get isLoggedIn() {
    return localStorage.getItem('isLoggedIn') == 'true';
  }

  set isLoggedIn(value: boolean) {
    localStorage.setItem('isLoggedIn', value.toString());
  }
  setAllData(data: any[]) {
    console.log(data);
    data.forEach((item) => {
      this.setItem(item.key, item.value)
    })
  }
}
