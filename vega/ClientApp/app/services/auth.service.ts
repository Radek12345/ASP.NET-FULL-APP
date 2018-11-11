import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { JwtHelper } from 'angular2-jwt';

(window as any).global = window;

@Injectable()
export class AuthService {
  private roles: string[] = [];

  auth0 = new auth0.WebAuth({
    clientID: 'LuAJ1szTcgf21qqI2cdlbYoKUXe63YfW',
    domain: 'vegaforlearn.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:5000/vehicles',
    scope: 'openid email profile',
    audience: 'https://api.vega.com',
    
  });

  constructor(public router: Router) {
    let token = localStorage.getItem('token');
    if (token) {
      let jwtHelper = new JwtHelper();
      let decodedToken = jwtHelper.decodeToken(token);
      this.roles = decodedToken['https://vega.com/roles'];
    }
  }

  public isInRole(roleName: string) {
    return this.roles.indexOf(roleName) > -1;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      console.log("authResult: ", authResult);

      if (authResult && authResult.accessToken && authResult.idToken) {

        console.log("email: ", authResult.idTokenPayload.email);

        window.location.hash = '';

        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult: any): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    let jwtHelper = new JwtHelper();
    let decodedToken = jwtHelper.decodeToken(authResult.accessToken);
    this.roles = decodedToken['https://vega.com/roles'];
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.roles = [];
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  public test() {
    console.log(localStorage.getItem('access_token'));
    console.log(localStorage.getItem('id_token'));
    console.log(localStorage.getItem('expires_at'));
  }

}