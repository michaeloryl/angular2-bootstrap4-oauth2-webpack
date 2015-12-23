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
<div>I'm logged in: {{authenticated}}</div>
<div class="row">
<div class="col-xs-3">{{idCookie }}</div>
</div>
`
})
export class PublicPage {
    constructor(private  cookies:CookieService, private authService:AuthService) {
        //console.log("Public instantiated");
    }

    get idCookie() {
        return this.cookies.getCookie('id');
    }

    get authenticated() {
        return this.authService.isAuthenticated();
    }
}
