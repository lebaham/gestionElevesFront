import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { LoginResponse } from './login.response';
import { LoginError } from '../error/login-error';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authUrl: String = '/personne/authenticate';
  private tokensRessource = '/token';
  private token$ = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) { }

  login(login: string, password: string) : Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    if (login == null) {
      throw new Error('Le login est obligatoire');
    }

    if(password == null){
      throw new Error('Le mot de passe est obligatoire');
    }

    const req = this.http.get<LoginResponse>(`${config.apiUrl}${this.tokensRessource}`, httpOptions);
    return this.computeAuthentication(req);  
  }

  public computeAuthentication(auth$: Observable<LoginResponse>): Observable<any> {
    return auth$.pipe(
      map((r: LoginResponse) => r.authToken),
      map((authToken: string) => {
        this.token$.next(authToken);
        sessionStorage.setItem('token', authToken);
      }),
      catchError(r => this.loginError(r))
    ) as Observable<any>;
  }

  /**
   * On login error handler
   *
   * @param error l'erreur httpClient
   * @returns {any}
   */
  private loginError(error: Response | any) {
    if (error.status === 403 || error.status === 401) {
      return throwError(LoginError.AuthenticationError);
    } else if (error.status === 412) {
      return throwError(LoginError.ProxyError);
    } else {
      return throwError(LoginError.Unknow);
    }
  }

  /**
   * logout handler
   */
  logout(): void {
    sessionStorage.clear();
    this.token$.next(null);
  }

}
