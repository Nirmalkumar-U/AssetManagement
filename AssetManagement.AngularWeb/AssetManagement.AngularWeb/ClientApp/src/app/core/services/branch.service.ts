import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "./http/http.service";

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private httpService: HttpService) { }

  getAllBranches(): Observable<any> {
    return this.httpService.get('Branch/GetBranchList');
  }
}
