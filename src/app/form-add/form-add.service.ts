import { ChartPanelInfo } from "./../chartPanelInfo";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class FormAddService {
  private urlPost: string = "http://localhost:3000/api/user/saveUser";
  private httpHeaders = new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded"
  });

  constructor(private http: HttpClient) {}

  postAddForm(photo: any, data: any):Observable<any> {
    // const body = new HttpParams().set(`data`, JSON.stringify(data));
    // return this.http.post<any>(this.urlPost, body.toString(), {
    //   headers: this.httpHeaders
    // });

    console.log(photo.name);
    let body = new FormData();

    body.append('type', data.type);
    body.append('photo', photo, photo.name);
    body.append("email", data.email);
    body.append("name", data.name);
    body.append("phone", data.phone);
    body.append("company", data.company);
    body.append("documentType", data.documentType);
    body.append("documentNumber", data.documentNumber);
    body.append("job", data.job);
    body.append("simulatorsLength", data.simulators.length);
    //body.append("simulators", JSON.stringify(data.simulators));
    for (let sim of data.simulators) {
      console.log(sim);
      body.append('simulators', sim)    
    }

    return this.http.post<any>(this.urlPost,body);
  }
}