import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {
  constructor(private http: HttpClient) { }
  saveForm(formStructure: any) {
    return this.http.post<any>('https://swatpro.co/submit_form.php', formStructure);
  }
}
