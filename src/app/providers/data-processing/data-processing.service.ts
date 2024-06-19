import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonFunctionsService } from '../../utils/common-functions/common-functions.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DataProcessingService {
  baseUrl = environment.baseUrl;
  constructor(private _commonFunction: CommonFunctionsService) {}

  getPlaylist = (data: any): Observable<any> => {
    const endpoint = this.baseUrl + 'playlist/getPlaylist';
    return this._commonFunction.globalPostService(endpoint, data);
  };

  addReview = (data: any): Observable<any> => {
    const endpoint = this.baseUrl + 'playlist/addReview';
    return this._commonFunction.globalPostService(endpoint, data);
  };

  uploadFile = (data: any): Observable<any> => {
    const endpoint = this.baseUrl + 'playlist/uploadFile';
    return this._commonFunction.globalPostService(endpoint, data);
  };
}
