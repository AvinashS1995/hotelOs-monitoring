import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private baseUrl = environment.apiUrl;
  // constructor(private http: HttpClient, private commonService: CommonService) {}

  user: any = {
    name: 'John Doe',
    role: 'manager',
    hotel: 'grand-plaza-ny',
    city: 'New York',
    state: 'NY',
    country: 'USA',
  };

  constructor() {}

  getUser() {
    return this.user;
  }

  logout() {
    console.log('User logged out');
    // You can add clearing localStorage, routing, etc.
  }
}
