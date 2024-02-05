import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiResponse, Category, Provider, ProviderGames } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  slotCategories(): Observable<Category[]> {
    return this.httpClient
      .get<ApiResponse<Category[]>>(
        `https://cms.crocobet.com/integrations/v2/slot/categories?include=games&platform=desktop`
      )
      .pipe(
        map((res) => {
          return res.data.filter((category) => {
            return (
              category.platform === 'desktop' || category.platform === 'all'
            );
          });
        })
      );
  }

  slotProviders(): Observable<Provider[]> {
    return this.httpClient
      .get<ApiResponse<Provider[]>>(
        `https://cms.crocobet.com/integrations?type=slot&platform=desktop`
      )
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }

  providerGames(provider: string): Observable<ProviderGames> {
    return this.httpClient
      .get<ApiResponse<ProviderGames>>(
        `https://cms.crocobet.com/integrations/v2/slot/providers/${provider}`
      )
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }
}
