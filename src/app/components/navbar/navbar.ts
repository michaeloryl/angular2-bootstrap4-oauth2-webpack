//These first 3 lines will be deprecated by the final release
import {Component} from "@angular/core";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'navbar',
    directives: [],
    providers: [],
    pipes: [],
    template: `
    <nav class="navbar navbar-fixed-top navbar-dark bg-success navbar-static-top">
        <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
            &#9776;
        </button>
        <div class="collapse navbar-toggleable-xs" id="collapsingNavbar">
            <a style="color:black" class="navbar-brand" href="#">A2B4O2OM</a>
            <ul class="nav navbar-nav">
                <li class="nav-item">
                    <a [routerLinkActive]="['active']" [routerLink]="['/public']" class="nav-link btn btn-success-outline">Public</a>
                </li>
                <li class="nav-item">
                <!-- @TODO: put disabled button back in instead of anchor: [disabled]="!authenticated"-->
                    <a [routerLinkActive]="['active']" [routerLink]="['/protected']" class="nav-link btn btn-success-outline">Protected</a>
                </li>
            </ul>
            <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                    <button *ngIf="!authenticated" (click)="doLogin()" class="nav-link btn btn-danger-outline" href="#">Login</button>
                    <button *ngIf="authenticated" (click)="doLogout()" class="nav-link btn btn-success-outline" href="#">Logout {{userName}}</button>
                </li>
            </ul>
        </div>
    </nav>
    `
})
export class Navbar {
    constructor(private authService:AuthService) {
    }

    get authenticated() {
        return this.authService.isAuthenticated();
    }

    doLogin() {
        this.authService.doLogin();
    }

    doLogout() {
        this.authService.doLogout();
    }

    get userName() {
        return this.authService.getUserName();
    }
}

