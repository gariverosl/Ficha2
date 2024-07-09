import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from "../models/usuario.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost:4000';
  
  constructor(private http: HttpClient) { }

  login(usuario: string, password: string ): Observable< Usuario[] > {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

  register(usuario: Usuario): Observable<any> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuarios`, usuario);
  }

}
