import { Component, provide } from '@angular/core';
//import { ROUTER_DIRECTIVES, RouteConfig, ROUTER_PROVIDERS, RouterOutlet } from '@angular/router-deprecated';
import { ROUTER_DIRECTIVES, provideRouter } from '@angular/router';
import { PathLocationStrategy, HashLocationStrategy, LocationStrategy } from "@angular/common";
import { HTTP_PROVIDERS } from '@angular/http';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { COMMON_DIRECTIVES } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Navbar } from './components/navbar/navbar';
import { WindowService } from './services/window.service';
import { AuthService } from './services/auth.service';
import { CookieService } from './services/cookies.service';
import { CallbackComponent } from "./components/auth/callback";
import { AppRoutes } from './app.routes';

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
export class App {
}

bootstrap(App, [
    CookieService,
    AuthService,
    WindowService,
    COMMON_DIRECTIVES,
    ROUTER_DIRECTIVES,
    HTTP_PROVIDERS,
    provideRouter(AppRoutes),
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]); // directives added here are available to all children
