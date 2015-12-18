/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 9:55 AM
 */
import {Component} from "angular2/core";
import {CookieService} from '../../services/cookies.service';

@Component({
    selector: 'public-page',
    directives: [],
    pipes: [],
    providers: [CookieService],
    template: `
<div>I'm public: {{xsrfCookie}}</div>
`
})
export class PublicPage {
    constructor(public cookies:CookieService) {
        //console.log("Public instantiated");
    }

    get xsrfCookie() {
        return this.cookies.getCookie('XSRF-TOKEN');
    }
}
