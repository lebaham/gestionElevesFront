import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authUrl: String = 'users/authenticate';
  constructor(private http: HttpClient) { }

  login(login: string, password: string) {
    return this.http.post<any>(`${config.apiUrl}/authUrl`, { login, password })
      .pipe(map(personne => {
        if (personne && personne.token) {
          localStorage.setItem('personne', JSON.stringify(personne));
        }
      }));
  }

  logout() { localStorage.removeItem('personne'); }
}
