import { AuthGuard } from './auth-guard.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AdminAuthGuard extends AuthGuard {

    constructor(auth: AuthService) {
        super(auth);
    }

    canActivate() {
        return super.canActivate() ? this.auth.isInRole('Admin') : false;
    }
}