import { Lieu } from 'src/app/models/Lieu';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})

export class LieuxService {

  constructor(private http: HttpClient) { }

  param_url: string = 'lieu';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Api-Key-Access': environment.API_ACCESS_KEY,
    }),
  };

  // Get list of all proprietaires from database
  getLieux(): Observable<Lieu[]> {
    return this.http.get<Lieu[]>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/all-lieu`,
      { headers: this.httpOptions.headers }
    );
  }

  // get specific "lieu" by his id
  getLieuById(id: String): Observable<Lieu> {
    return this.http.get<Lieu>(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/lieu-by-id/` + id);
  }

  addLieu(data: Lieu): Observable<Lieu> {
    return this.http.post<Lieu>(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/ajouter`, data);
  }

  // Update the proprietaire
  updateLieux(id: any, data: Lieu): Observable<Lieu> {
      return this.http.patch<Lieu>(
        `${
          environment.API_URL_TEST + environment.API_VERSION + this.param_url
        }/modifier/${id}`,
        data,
        { headers: this.httpOptions.headers }
      );
  }

  deleteLieu(id: any, data: any): Observable<Lieu> {
    return this.http.patch<Lieu>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/delete/${id}`,
      data,
      { headers: this.httpOptions.headers }
    );
  }

  //get dr and sup to load dropdown list
  getDrSup(): Observable<any> {
    return this.http.get<any>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/Dr/Sup`,
      { headers: this.httpOptions.headers }
    );
  }

  //get the list of lieux to load the drop down list in contrat component
  listLieux(){
    return this.http.get( `${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/all-lieu`);
  }


}
