var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var browser_1 = require('angular2/platform/browser');
var common_1 = require('angular2/common');
var navbar_1 = require('./components/navbar/navbar');
var protected_page_1 = require('./components/pages/protected-page');
var public_page_1 = require('./components/pages/public-page');
var window_service_1 = require('./services/window.service');
var auth_service_1 = require('./services/auth.service');
var cookies_service_1 = require('./services/cookies.service');
var App = (function () {
    function App() {
    }
    App = __decorate([
        core_1.Component({
            selector: 'app',
            directives: [navbar_1.Navbar, router_1.ROUTER_DIRECTIVES],
            template: "\n<div class=\"container-fluid\">\n    <router-outlet></router-outlet>\n</div>\n"
        }),
        router_1.RouteConfig([
            { path: '/public', name: 'PublicPage', component: public_page_1.PublicPage },
            { path: '/protected', name: 'ProtectedPage', component: protected_page_1.ProtectedPage },
            { path: '/', redirectTo: ['PublicPage'] }
        ]), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
})();
exports.App = App;
browser_1.bootstrap(App, [cookies_service_1.CookieService, auth_service_1.AuthService, window_service_1.WindowService, common_1.COMMON_DIRECTIVES, router_1.ROUTER_DIRECTIVES, router_1.ROUTER_PROVIDERS, core_1.provide(router_1.LocationStrategy, { useClass: router_1.PathLocationStrategy })]);
//# sourceMappingURL=app.js.map