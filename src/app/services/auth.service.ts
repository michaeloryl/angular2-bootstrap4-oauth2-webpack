/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 10:34 AM
 */
import {Injectable} from "angular2/core";
import {WindowService} from './window.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
    private authenticated = false;
    private windowHandle = null;
    private callbackTokenUrl = 'http://localhost:3000/auth/callback';
    private oAuthTokenUrl = `https://test.pennmutual.com/oauth2/dialog/authorize?redirect_uri=${this.callbackTokenUrl}&response_type=token&client_id=a2o2demo&scope=pml_data_access+basic_access`;

    constructor(public windows:WindowService) {

    }

    doOAuthLogin() {
        if ("onhashchange" in window) {
            console.log('Supports onhashchange');
        }

        this.windowHandle = this.windows.createWindow(this.oAuth2URL(), 'OAuth2 Login');

/*
        console.log("Location:", JSON.stringify(this.windowHandle.location));

        var observ = Observable.fromEvent(window, 'hashchange');

        var subscription = observ.subscribe(
            function (href) {
                console.log('Next:', href);
            },
            function (err) {
                console.log('Error:', err);
            },
            function () {
                console.log('Completed');
            }
        );

        setTimeout(function() {
            subscription.remove();
        }, 1000);
*/

    }

    oAuth2URL() {
        return this.oAuthTokenUrl;
    }

    get isAuthenticated() {
        return this.authenticated;
    }

}

