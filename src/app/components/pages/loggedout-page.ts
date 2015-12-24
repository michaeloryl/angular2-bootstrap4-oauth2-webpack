/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 9:55 AM
 */
import {Component, OnDestroy} from "angular2/core";
import {CookieService} from '../../services/cookies.service';
import {WindowService} from '../../services/window.service';
import {AuthService} from '../../services/auth.service';
import {ROUTER_DIRECTIVES, Router, Location} from "angular2/router";
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
export class LoggedoutPage implements OnDestroy{
    private sub:any = null;

    constructor(private authService:AuthService, private router:Router, private location:Location) {
        if (authService.isAuthenticated()) {
            this.location.replaceState('/');
            this.router.navigate(['PublicPage']);
        }

        this.sub = this.authService.subscribe((val) => {
            if (val.authenticated) {
                this.location.replaceState('/');
                this.router.navigate(['PublicPage']);
            }
        });
    }

    ngOnDestroy() {
        if (this.sub != null) {
            this.sub.unsubscribe();
        }
    }
}
