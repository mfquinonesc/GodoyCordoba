import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private path: string = `${environment.API_PATH}/usuario`;

  private mode = new BehaviorSubject<boolean>(false);
  
  constructor(private http: HttpClient, private router:Router) {}

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
     return this.http.post(this.path, user);
  }

  setToken(token:string){
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  setSession(usuario:Usuario){
    localStorage.setItem('session',JSON.stringify(usuario));
  }

  getSession():Usuario| null{
    const user = localStorage.getItem('session');
    return user? user as unknown as Usuario: null;
  }

  clear(){
    localStorage.clear();
  } 
}
