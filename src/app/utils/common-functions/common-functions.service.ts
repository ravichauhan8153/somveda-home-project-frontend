import { throwError, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommonFunctionsService {
  constructor(private http: HttpClient) {}

  //Global Get, Post, Put and Delete
  /**
   * FUNCTION: COMMON GET HTTP REQUEST
   * @param {STRING} endpoint
   * @param {Object} data
   * @param {Object} headers
   * @returns HTTP GET CALL RESPONSE
   */
  globalGetService(endpoint: string, headers?: any) {
    let httpPostReq = this.http.get(endpoint);
    if (headers) httpPostReq = this.http.get(endpoint, headers);
    return httpPostReq.pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  /**
   * FUNCTION: COMMON POST HTTP REQUEST
   * @param {STRING} endpoint
   * @param {Object} data
   * @param {Object} headers
   * @returns HTTP POST CALL RESPONSE
   */
  globalPostService(endpoint: string, data?: any, headers?: any) {
    let httpPostReq = this.http.post(endpoint, data);
    if (headers) httpPostReq = this.http.post(endpoint, data, headers);
    return httpPostReq.pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
