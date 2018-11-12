import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(protected auth: AuthService) { }

    canActivate() {
        if (this.auth.isAuthenticated())
            return true;

        location.href = "https://vegaforlearn.auth0.com/login?state=UkhPoNMMyDhWMDPN3l1Rm13aF5GGBEo2&client=LuAJ1szTcgf21qqI2cdlbYoKUXe63YfW&protocol=oauth2&response_type=token%20id_token&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fvehicles&scope=openid%20email%20profile&audience=https%3A%2F%2Fapi.vega.com&nonce=eim..wunB5hRXJmnV1CbKSEb7DzrSS3d&auth0Client=eyJuYW1lIjoiYXV0aDAuanMiLCJ2ZXJzaW9uIjoiOS44LjEifQ%3D%3D";
        return false;
    }
}