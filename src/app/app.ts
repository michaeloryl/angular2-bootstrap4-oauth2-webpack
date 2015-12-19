import {Component, provide} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, ROUTER_PROVIDERS, RouterOutlet, PathLocationStrategy, HashLocationStrategy, LocationStrategy} from 'angular2/router';
import {bootstrap} from 'angular2/platform/browser';
import {COMMON_DIRECTIVES} from 'angular2/common';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

import {Navbar} from './components/navbar/navbar';
import {ProtectedPage} from './components/pages/protected-page'
import {PublicPage} from './components/pages/public-page'
import {WindowService} from './services/window.service';
import {AuthService} from './services/auth.service';
import {CookieService} from './services/cookies.service';

@Component({
    selector: 'app',
    directives: [Navbar, ROUTER_DIRECTIVES],
    template: `
<div class="pos-f-t">
    <navbar></navbar>
</div>

<div class="container-fluid">
    <router-outlet></router-outlet>
</div>

    `
})
@RouteConfig([
    {path: '/public', name: 'PublicPage', component: PublicPage,  useAsDefault: true},
    {path: '/protected', name: 'ProtectedPage', component: ProtectedPage}
])
export class App {
}

bootstrap(App, [CookieService, AuthService, WindowService, COMMON_DIRECTIVES, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: PathLocationStrategy})]); // directives added here are available to all children
