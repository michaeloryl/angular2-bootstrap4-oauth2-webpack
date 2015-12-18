/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 10:34 AM
 */
import {Injectable} from "angular2/core";
import {Http} from 'angular2/http';
import {Location} from 'angular2/router';

@Injectable()
export class AuthService {
    private authenticated = false;
    private redirectUrl = 'http://localhost:3000/auth/callback';
    private oAuthBaseUrl = 'https://test.pennmutual.com/oauth2/dialog/authorize?redirect_uri=${callbackUrl}&response_type=code&client_id=abc123&scope=offline_access+pml_data_access+basic_access'

    constructor(http:Http, location:Location) {

    }

    doOAuthLogin() {
        window.location.href = this.oAuth2URL();
    }

    oAuth2URL() {
        return 'https://test.pennmutual.com/oauth2/dialog/authorize?redirect_uri=https://test.pennmutual.com/oauth2/&response_type=code&client_id=abc123&scope=offline_access+pml_data_access+basic_access'
    }

    get isAuthenticated() {
        return this.authenticated;
    }

}