import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private baseUrl = 'https://localhost:7107/Branch/';

  constructor(private httpClient: HttpClient) { }

  getAllBranches(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl+'GetBranchList');
  }
}
