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
    selector: 'loggedout-page',
    directives: [Navbar],
    pipes: [],
    providers: [],
    template: `
<div class="pos-f-t">
    <navbar></navbar>
</div>
<div><h2>You have been logged out.</h2></div>
`
})
export class LoggedoutPage {
    constructor() {
    }
}
