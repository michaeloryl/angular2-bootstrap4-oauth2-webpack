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
    private callbackTokenUrl:string = 'http://localhost:3000/auth/callback';
    private oAuthTokenUrl:string = `https://test.pennmutual.com/oauth2/dialog/authorize?redirect_uri=${this.callbackTokenUrl}&response_type=token&client_id=a2o2demo&scope=pml_data_access+basic_access`;
    private authenticated:boolean = false;
    private token:string;
    private expires:number = 0;
    private userInfo:Object = {};
    private windowHandle:any = null;
    private intervalId:any = null;
    private expiresTimerId:any = null;
    private loopCount = 600;
    private intervalLength = 100;

    private locationWatcher = new EventEmitter();
    private subscription;

    constructor(public windows:WindowService) {
        this.subscription = this.getEvent().subscribe(
            (val) => {
                console.log('Received:', val);
            },
            (err) => {
                console.log('Received error:', err);
            },
            () => {
                console.log('Completed');
            }
        );
    }

    public doLogin() {
        var loopCount = this.loopCount;
        this.windowHandle = this.windows.createWindow(this.oAuthTokenUrl, 'OAuth2 Login');

        this.intervalId = setInterval(() => {
            if (loopCount-- < 0) {
                clearInterval(this.intervalId);
                this.emitAuthStatus(false);
                this.windowHandle.close();
            } else {
                var href:string;
                try {
                    href = this.windowHandle.location.href;
                } catch (e) {
                    //console.log('Error:', e);
                }
                if (href != null) {
                    var re = /.*\/auth\/callback#access_token=(.*)&expires_in=(.*)&token_type=Bearer/;
                    var found = href.match(re);
                    if (found) {
                        clearInterval(this.intervalId);
                        this.authenticated = true;
                        this.token = found[1];
                        this.setExpiresTimer(Number(found[2]));
                        this.expires = Number(found[2]);
                        this.windowHandle.close();
                        this.emitAuthStatus(true);
                    }
                }
            }
        }, this.intervalLength);
    }

    public doLogout() {
        this.authenticated = false;
        this.expiresTimerId = null;
        this.expires = 0;
        this.token = null;
        this.emitAuthStatus(true);
        console.log('Session has expired');
    }

    private emitAuthStatus(success:boolean) {
        this.locationWatcher.emit({success: success, authenticated: this.authenticated, token: this.token, expires: this.expires });
    }

    private fetchUserInfo() {
        // get user info associated with the current token
    }

    public getUserInfo() {
        return this.userInfo;
    }

    private setExpiresTimer(seconds:number) {
        if (this.expiresTimerId != null) {
            clearTimeout(this.expiresTimerId);
        }
        this.expiresTimerId = setTimeout(() => {
            this.doLogout();
        }, 10000); // seconds * 1000
        console.log('Token expiration timer set for %s seconds', seconds);
    }

    public getEvent() {
        return this.locationWatcher;
    }

    /*
     doOAuthLogin2() {
     console.log('Logging in!');

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
     console.log('Listening for event');
     this.windowHandle = this.windows.createWindow('http://localhost:3000/', 'OAuth2 Login');

     var counter = 0;

     var source = Observable.fromEvent(this.windowHandle, 'hashchange');

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

     doObservableTest2() {
     this.windowHandle = this.windows.createWindow(this.oAuth2URL(), 'OAuth2 Login');

     var counter = 0;

     var source = Rx.Observable.timer(0, 100)
     .map(() => {
     return this.windowHandle.location.href
     })
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
     */

    private oAuth2URL() {
        return this.oAuthTokenUrl;
    }

    public isAuthenticated() {
        return this.authenticated;
    }

}

