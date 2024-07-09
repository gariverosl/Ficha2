import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Atencion } from '../models/atencion.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtenService {

  private apiUrl: string = 'http://localhost:4000';
  
  constructor(private http: HttpClient) { }

  listAten(): Observable< Atencion[] > {
    return this.http.get<Atencion[]>(`${this.apiUrl}/atenciones`);
  }
  
  listAtenId(id : number): Observable< Atencion[] > {
    return this.http.get<Atencion[]>(`${this.apiUrl}/atenciones/${id}`);
  }
  saveAten(atencion: Atencion): Observable<any> {
    return this.http.post<Atencion>(`${this.apiUrl}/atenciones`, atencion);
  }

  deleteAten(id: String): Observable<any> {
    return this.http.delete(`${this.apiUrl}/atenciones/${id}`);
  }
  
  updateAten(atencion: Atencion, id:String): Observable<any> {
    return this.http.put(`${this.apiUrl}/atenciones/${id}`, atencion);
  }
  

}
