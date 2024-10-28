import { HttpService } from '@nestjs/axios';

import {
  delay,
  lastValueFrom,
  map,
  Observable,
  of,
  throwError,
  timer,
} from 'rxjs';
import { retryWhen, take, mergeMap, catchError, scan } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RestApiService {

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {

  }


  async sendRequest(url:string, data: any, headers: any) {

    return await lastValueFrom(
      this.httpService
        .post(
          url,
          data,
          {
            headers: headers,
          },
        )
        .pipe(
          map((response) => {
            return response.data;
          }),
        )
        .pipe(
          catchError((err) => {
            console.log(`API CALL  FAILED ${err}`);
            return of(null);
          }),
        ),
    );
  }

  async fetchRequest(url:string) {

    return await lastValueFrom(
      this.httpService
        .get(
          url
        )
        .pipe(
          map((response) => {
            return response.data;
          }),
        )
        .pipe(
          catchError((err) => {
            console.log(`API CALL  FAILED ${err}`);
            return of(null);
          }),
        ),
    );
  }
}
