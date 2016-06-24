import {Directive, OnDestroy} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {Location} from "@angular/common";

@Directive({
    selector: '[protected]'
})

export class ProtectedDirective implements OnDestroy {
    private sub:any = null;

    constructor(private authService:AuthService, private router:Router, private location:Location) {
        if (!authService.isAuthenticated()) {
            this.location.replaceState('/');
            this.router.navigateByUrl('public');
        }

        this.sub = this.authService.subscribe((val) => {
            console.log("Val from auth service:", val);
            if (!val.authenticated) {
                this.location.replaceState('/');
                this.router.navigateByUrl('loggedout');
            }
        });
    }

    ngOnDestroy() {
        if (this.sub != null) {
            this.sub.unsubscribe();
        }
    }
}