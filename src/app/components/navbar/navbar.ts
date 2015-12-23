//These first 3 lines will be deprecated by the final release
import {Component} from "angular2/core";

import {ROUTER_DIRECTIVES, Router, Location} from "angular2/router";
import {AuthService} from '../../services/auth.service';


@Component({
    selector: 'navbar',
    directives: [ROUTER_DIRECTIVES],
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
                    <button [ngClass]="{active: page === 'public'}" class="nav-link btn btn-success-outline" [routerLink]="['PublicPage']">Public</button>
                </li>
                <li class="nav-item">
                    <button [disabled]="!authenticated" [ngClass]="{active: page === 'protected'}" class="nav-link btn btn-success-outline" [routerLink]="['ProtectedPage']">Protected</button>
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
    constructor(private location:Location, private router:Router, private authService:AuthService) {
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

    get page() {
        return this.location.path().split('/')[1];
    }
}

