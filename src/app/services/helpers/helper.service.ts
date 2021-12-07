import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private http: HttpClient, private pipeDate: DatePipe) {}

  // Reload page
  refrechPage() {
    location.reload();
  }

  toTheUp() {
    window.scroll(0, 0);
  }

  // Get all counts from server
  getAllCounts() {
    return this.http.get(
      `${environment.API_URL_TEST + environment.API_VERSION}/count-all`
    );
  }

  getCities() {
    return this.http.get(
      `${environment.API_URL_TEST + environment.API_VERSION}/cities`
    );
  }

  getCountries() {
    return this.http.get(
      `${environment.API_URL_TEST + environment.API_VERSION}/countries`
    );
  }

  checkServerConnectivity(): Observable<Boolean> {
    return this.http.get<Boolean>(
      `${environment.API_URL_TEST + environment.API_VERSION}`
    );
  }

  booleanToText(value: boolean | undefined) {
    let text!: string;
    value ? (text = 'Oui') : (text = 'Non');
    return text;
  }

  formatDate(date: Date) {
    return this.pipeDate.transform(date, 'yyyy-MM-dd');
  }

  getNextClotureDate() {
    return this.http.get(
      `${environment.API_URL_TEST + environment.API_VERSION}/next-cloture`
    );
  }

  getMounths(): any[] {
    let dateList: any[] = [
      {
        number: 1,
        name: 'Janvier',
      },
      {
        number: 2,
        name: 'Février',
      },
      {
        number: 3,
        name: 'Mars',
      },
      {
        number: 4,
        name: 'Avril',
      },
      {
        number: 5,
        name: 'Mai',
      },
      {
        number: 6,
        name: 'Juin',
      },
      {
        number: 7,
        name: 'Juillet',
      },
      {
        number: 8,
        name: 'Août',
      },
      {
        number: 9,
        name: 'Janvier',
      },
      {
        number: 10,
        name: 'Septembre',
      },
      {
        number: 11,
        name: 'Novembre',
      },
      {
        number: 12,
        name: 'Décembre',
      },
    ];

    return dateList
  }


  // Check if all inputs has invalid errors
  // mainCheckInputsValidation(targetInput: any) {
  //   return targetInput?.invalid && (targetInput.dirty || targetInput.touched);
  // }
}
