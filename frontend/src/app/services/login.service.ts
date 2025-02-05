import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private path: string = `${environment.API_PATH}/usuario`;

  private mode = new BehaviorSubject<boolean>(false);

  private isLoggeIn = new BehaviorSubject<boolean>(false);
  
  constructor(private http: HttpClient) {}

  login() {
    this.mode.next(false);
  }

  regist() {
    this.mode.next(true);
  }

  getMode(): Observable<boolean> {
    return this.mode.asObservable();
  }

  signIn(login: Login): Observable<any> {
    return this.http.post(`${this.path}/login`, login);
  }

  signUp(user: Usuario): Observable<any> {
    console.log(user);
    
    return this.http.post(this.path, user);
  }

  setIsLoggedIn(value:boolean){   
    this.isLoggeIn.next(value);
  }

  getIsLoggedIn():Observable<boolean>{
    return this.isLoggeIn.asObservable();
  }
}
