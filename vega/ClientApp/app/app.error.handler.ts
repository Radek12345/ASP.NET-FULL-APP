import { ErrorHandler, Injectable, Inject, NgZone, isDevMode } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import * as Sentry from "@sentry/browser";

@Injectable()
export class AppErrorHandler implements ErrorHandler {

    constructor(@Inject(NgZone) private ngZone: NgZone,
                @Inject(ToastyService) private toastyService: ToastyService) { }

    handleError(error: any): void {
        this.ngZone.run(() => {
            this.toastyService.error({
                title: 'Error',
                msg: 'An unexpected error happened.',
                theme: 'bootstrap',
                showClose: true,
                timeout: 5000
            });
        });

        if (!isDevMode())
            Sentry.captureException(error.originalError || error);
        else
            console.log(error);
    }
}