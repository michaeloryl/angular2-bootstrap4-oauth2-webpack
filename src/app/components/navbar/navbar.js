var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var router_1 = require("angular2/router");
var auth_service_1 = require('../../services/auth.service');
var Navbar = (function () {
    function Navbar(location, router, authService) {
        this.location = location;
        this.router = router;
        this.authService = authService;
    }
    Object.defineProperty(Navbar.prototype, "authenticated", {
        get: function () {
            return this.authService.isAuthenticated();
        },
        enumerable: true,
        configurable: true
    });
    Navbar.prototype.doLogin = function () {
        this.myWindow = this.authService.doLogin();
    };
    Navbar.prototype.doLogout = function () {
        this.myWindow = this.authService.doLogout();
    };
    Object.defineProperty(Navbar.prototype, "page", {
        get: function () {
            return this.location.path().split('/')[1];
        },
        enumerable: true,
        configurable: true
    });
    Navbar = __decorate([
        core_1.Component({
            selector: 'navbar',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [],
            pipes: [],
            template: "\n    <nav class=\"navbar navbar-fixed-top navbar-dark bg-success navbar-static-top\">\n        <button class=\"navbar-toggler hidden-sm-up\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsingNavbar\">\n            &#9776;\n        </button>\n        <div class=\"collapse navbar-toggleable-xs\" id=\"collapsingNavbar\">\n            <a style=\"color:black\" class=\"navbar-brand\" href=\"#\">A2B4O2OM</a>\n            <ul class=\"nav navbar-nav\">\n                <li class=\"nav-item\">\n                    <button [ngClass]=\"{active: page === 'public'}\" class=\"nav-link btn btn-success-outline\" [routerLink]=\"['PublicPage']\">Public</button>\n                </li>\n                <li class=\"nav-item\">\n                    <button [disabled]=\"!authenticated\" [ngClass]=\"{active: page === 'protected'}\" class=\"nav-link btn btn-success-outline\" [routerLink]=\"['ProtectedPage']\">Protected</button>\n                </li>\n            </ul>\n            <ul class=\"nav navbar-nav pull-xs-right\">\n                <li class=\"nav-item\">\n                    <button *ngIf=\"!authenticated\" (click)=\"doLogin()\" class=\"nav-link btn btn-danger-outline\" href=\"#\">Login</button>\n                    <button *ngIf=\"authenticated\" (click)=\"doLogout()\" class=\"nav-link btn btn-success-outline\" href=\"#\">Logout</button>\n                </li>\n            </ul>\n        </div>\n    </nav>\n    "
        }), 
        __metadata('design:paramtypes', [router_1.Location, router_1.Router, auth_service_1.AuthService])
    ], Navbar);
    return Navbar;
})();
exports.Navbar = Navbar;
//# sourceMappingURL=navbar.js.map