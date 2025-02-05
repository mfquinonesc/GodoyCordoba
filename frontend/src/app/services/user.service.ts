import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private path: string = `${environment.API_PATH}/usuario`;  

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<any> {
    return this.http.get(`${this.path}/${id}`);
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.path}`);
  }

  update(id: number, user: Usuario): Observable<any> {
    return this.http.put(`${this.path}/${id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.path}/${id}`);
  }  
}
