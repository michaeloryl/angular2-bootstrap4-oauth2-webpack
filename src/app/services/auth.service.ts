/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 10:34 AM
 */
import {Injectable, EventEmitter} from "angular2/core";
import {WindowService} from './window.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/takeWhile';

import * as Rx from 'rxjs/Rx.KitchenSink';

@Injectable()
export class AuthService {
    private authenticated = false;
    private windowHandle = null;
    private callbackTokenUrl = 'http://localhost:3000/auth/callback';
    private oAuthTokenUrl = `https://test.pennmutual.com/oauth2/dialog/authorize?redirect_uri=${this.callbackTokenUrl}&response_type=token&client_id=a2o2demo&scope=pml_data_access+basic_access`;

    private locationWatcher = new EventEmitter();

    constructor(public windows:WindowService) {

    }

    doOAuthLogin() {
        console.log('Logging in');

        var mySub = this.locationWatcher.subscribe(
            (val) => {
                console.log('Received:', val);
            },
            (err) => {
                console.log('Received error:', err);
            },
            (complete) => {
                console.log('Completed:', complete);
            }
        );

        console.log("Before:", this.locationWatcher);

        this.locationWatcher.emit('Fred');

        console.log("After:", this.locationWatcher);

        setInterval(() => {
            this.locationWatcher.emit('Gone');
        }, 2000);
    }

    doObservableTest() {
        this.windowHandle = this.windows.createWindow('http://localhost:3000/', 'OAuth2 Login');

        var counter = 0;

        var source = Rx.Observable.timer(0, 100)
            .map(() => { return this.windowHandle.location.href })
            .takeWhile(() => {
                return counter++ < 5000;
            });

        var mySub = source.subscribe(
            (val) => {
                console.log('Received:', val);
            },
            (err) => {
                console.log('Received error:', err);
            },
            (complete) => {
                console.log('Completed:', complete);
            }
        );

    }

/*
    doOAuthLogin() {
        this.windowHandle = this.windows.createWindow(this.oAuth2URL(), 'OAuth2 Login');

        var observ = Observable.create((ob) => {
            ob.next(42);
            ob.complete();

            // Note that this is optional, you do not have to return this if you require no cleanup
            return function () {
                console.log('disposed');
            };
        });
/!*
            .timer(0, 500)
            .take(5);
*!/

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

/!*        setTimeout(function () {
            subscription.remove();
        }, 10000);*!/

    }
*/

    oAuth2URL() {
        return this.oAuthTokenUrl;
    }

    get isAuthenticated() {
        return this.authenticated;
    }

}

