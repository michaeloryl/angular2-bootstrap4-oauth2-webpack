import {Component, provide} from '@angular/core';
import {ROUTER_DIRECTIVES, RouteConfig, ROUTER_PROVIDERS, RouterOutlet} from '@angular/router-deprecated';
import {PathLocationStrategy, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {HTTP_PROVIDERS} from '@angular/http';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {COMMON_DIRECTIVES} from '@angular/common';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

import {Navbar} from './components/navbar/navbar';
import {ProtectedPage} from './components/pages/protected-page'
import {PublicPage} from './components/pages/public-page'
import {WindowService} from './services/window.service';
import {AuthService} from './services/auth.service';
import {CookieService} from './services/cookies.service';
import {CallbackComponent} from "./components/auth/callback";
import {LoggedoutPage} from "./components/pages/loggedout-page";

//import 'rxjs/Rx'; // this would import all RxJS operators
import 'rxjs/add/operator/map';

@Component({
    selector: 'app',
    directives: [Navbar, ROUTER_DIRECTIVES],
    template: `
<div class="container-fluid">
    <router-outlet></router-outlet>
</div>
`
})
@RouteConfig([
    {path: '/loggedout', name: 'LoggedoutPage', component: LoggedoutPage},
    {path: '/public', name: 'PublicPage', component: PublicPage},
    {path: '/protected', name: 'ProtectedPage', component: ProtectedPage},
//    {path: '/colin', name: 'ColinPage', component: ColinPage},
    {path: '/', redirectTo: ['PublicPage']}
])
export class App {
}

bootstrap(App, [CookieService, AuthService, WindowService, COMMON_DIRECTIVES, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, HTTP_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]); // directives added here are available to all children
