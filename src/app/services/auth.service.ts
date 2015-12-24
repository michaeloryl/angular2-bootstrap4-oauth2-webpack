/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 10:34 AM
 */
import {Injectable, EventEmitter} from "angular2/core";
import {WindowService} from './window.service';
import {Http, Headers} from 'angular2/http'

@Injectable()
export class AuthService {
    private oAuthCallbackUrl:string;
    private oAuthBaseUrl:string;
    private oAuthTokenUrl:string;
    private oAuthUserUrl:string;
    private authenticated:boolean = false;
    private token:string;
    private expires:any = 0;
    private userInfo:Object = {};
    private windowHandle:any = null;
    private intervalId:any = null;
    private expiresTimerId:any = null;
    private loopCount = 600;
    private intervalLength = 100;

    private locationWatcher = new EventEmitter();  // @TODO: switch to RxJS Subject instead of EventEmitter
    private subscription;

    constructor(private windows:WindowService, private http:Http) {
        http.get('config.json')
            .map(res => res.json() )
            .subscribe(config => {
                this.oAuthCallbackUrl = config.callbackUrl;
                this.oAuthBaseUrl = config.baseUrl;
                this.oAuthTokenUrl = config.baseUrl + config.implicitGrantUrl;
                this.oAuthTokenUrl = this.oAuthTokenUrl
                    .replace('__callbackUrl__', config.callbackUrl)
                    .replace('__clientId__', config.clientId)
                    .replace('__scopes__', config.scopes);
                this.oAuthUserUrl = config.baseUrl + config.userInfoUrl;
            })
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
                        var expiresSeconds = Number(found[2]);

                        this.authenticated = true;
                        this.token = found[1];
                        this.startExpiresTimer(expiresSeconds);
                        this.expires = new Date();
                        this.expires = this.expires.setSeconds(this.expires.getSeconds() + expiresSeconds);
                        this.windowHandle.close();
                        this.emitAuthStatus(true);
                        this.fetchUserInfo();
                        // @TODO: validate access token
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
        // @TODO: invalidate the token?
        console.log('Session has expired');
    }

    private emitAuthStatus(success:boolean) {
        this.locationWatcher.emit({success: success, authenticated: this.authenticated, token: this.token, expires: this.expires});
    }

    public getSession() {
        return {authenticated: this.authenticated, token: this.token, expires: this.expires};
    }

    private fetchUserInfo() {
        if (this.token != null) {
            var headers = new Headers();
            headers.append('Authorization', `Bearer ${this.token}`);
            this.http.get(this.oAuthUserUrl, {headers: headers}).subscribe(info => {
                this.userInfo = JSON.parse(info._body);
            });
        }
    }

    public getUserInfo() {
        return this.userInfo;
    }

    public getUserName() {
        return this.userInfo ? this.userInfo.name : null;
    }

    private startExpiresTimer(seconds:number) {
        if (this.expiresTimerId != null) {
            clearTimeout(this.expiresTimerId);
        }
        this.expiresTimerId = setTimeout(() => {
            this.doLogout();
        }, seconds * 1000); // seconds * 1000
        console.log('Token expiration timer set for %s seconds', seconds);
    }

    public subscribe(onNext:(value:any) => void, onThrow?:(exception:any) => void, onReturn?:() => void) {
        return this.locationWatcher.subscribe(onNext, onThrow, onReturn);
        // @TODO: must handle unsubscription when instance is broken down
    }

    public isAuthenticated() {
        return this.authenticated;
    }

}

