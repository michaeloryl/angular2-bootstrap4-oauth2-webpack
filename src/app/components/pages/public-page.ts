/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 9:55 AM
 */
import {Component} from "angular2/core";
import {CookieService} from '../../services/cookies.service';
import {WindowService} from '../../services/window.service';
import {AuthService} from '../../services/auth.service';
import {Navbar} from '../../components/navbar/navbar';

@Component({
    selector: 'public-page',
    directives: [Navbar],
    pipes: [],
    providers: [],
    template: `
<div class="pos-f-t">
    <navbar></navbar>
</div>
<div>I'm public: {{xsrfCookie}}</div>
<div class="row">
<div class="col-xs-3"><button (click)="doLogin()" class="btn btn-primary">Login!</button></div>
<div class="col-xs-3"><button (click)="doObTest()" class="btn btn-primary">Observe!</button></div>
<div class="col-xs-6">{{myWindow }}</div>
<div class="col-xs-3">{{idCookie }}</div>
</div>
`
})
export class PublicPage {
    myWindow = null;

    constructor(private  cookies:CookieService,
                private authService:AuthService) {
        //console.log("Public instantiated");
    }

    get idCookie() {
        return this.cookies.getCookie('id');
    }

    doLogin() {
        this.myWindow = this.authService.doLogin();
    }

    doLogout() {
        this.myWindow = this.authService.doLogout();
    }

    doObTest() {
        this.authService.doObservableTest();
    }
}
