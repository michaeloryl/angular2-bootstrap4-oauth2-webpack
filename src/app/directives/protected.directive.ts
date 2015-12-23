import {Directive} from 'angular2/core';
import {AuthService} from '../services/auth.service';
import {ROUTER_DIRECTIVES, Router, Location} from "angular2/router";

@Directive({
    selector: '[protected]'
})

export class ProtectedDirective {
    constructor(private authService:AuthService, private router:Router, private location:Location) {
        if (!authService.isAuthenticated()) {
            this.location.replaceState('/');
            this.router.navigate(['PublicPage']);
        }

        var sub = this.authService.getEvent().subscribe(
            (val) => {
                console.log('[protected] Received:', val);
                if (!val.authenticated) {
                    this.location.replaceState('/');
                    this.router.navigate(['PublicPage']);
                    sub.remove();
                }
            },
            (err) => {
                console.log('[protected] Received error:', err);
            },
            () => {
                console.log('[protected] Completed');
            }
        );
    }
}