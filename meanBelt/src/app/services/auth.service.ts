import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import { CookieService } from "ngx-cookie";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { User } from '../user'

@Injectable()
export class AuthService {

observedUser = new BehaviorSubject(null);
  

constructor(private _http: Http, private cookieService: CookieService) { }

  updateObs(user: User) {
    this.observedUser.next(user);
  }

  login(user: User): Promise<User> {
    return this._http.post('/api/auth/login', user)
      .map(res => res.json())
      .toPromise()
  }

  getUser(): Promise<User[]> {
    return this._http.get('/api/auth/one')
    .map(res => res.json())
    .toPromise()
  }

  getUsers(): Promise<User[]> {
    return this._http.get('/api/auth')
    .map(res => res.json())
      .toPromise()
  }

  getOne(id: String): Promise<User> {
    return this._http.get(`/api/auth/${id}`)
    .map(data => data.json())
    .toPromise();
  }


  logout(): Promise<User> {
    return this._http.delete('/api/auth/logout')
      .map(res => res.json())
      .toPromise()
  }

  isAuthed(): boolean {
    const expired = parseInt(this.cookieService.get('expiration'), 10)
    const userId = this.cookieService.get('userID')
    const session = this.cookieService.get('session')

    return Boolean(session && expired && userId && expired > Date.now())
  }
}
