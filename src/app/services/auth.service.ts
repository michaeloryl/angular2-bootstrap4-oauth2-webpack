/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 10:34 AM
 */
import {Injectable} from "angular2/core";
import {WindowService} from './window.service';

@Injectable()
export class AuthService {
    private authenticated = false;
    private windowHandle = null;
    private callbackTokenUrl = 'http://localhost:3000/%23/auth/callback';
    private callbackCodeUrl = 'http://localhost:3000/auth/callback';
    private oAuthCodeUrl = `https://test.pennmutual.com/oauth2/dialog/authorize?redirect_uri=${this.callbackCodeUrl}&response_type=code&client_id=a2o2demo&scope=pml_data_access+basic_access`;
    private oAuthTokenUrl = `https://test.pennmutual.com/oauth2/dialog/authorize?redirect_uri=${this.callbackTokenUrl}&response_type=token&client_id=a2o2demo&scope=pml_data_access+basic_access`;
    private useToken:boolean = true;

    constructor(public windows:WindowService) {

    }

    doOAuthLogin() {
        this.windowHandle = this.windows.createWindow(this.oAuth2URL(), 'OAuth2 Login');
    }

    oAuth2URL() {
        return (this.useToken ? this.oAuthTokenUrl : this.oAuthCodeUrl);
    }

    get isAuthenticated() {
        return this.authenticated;
    }

}