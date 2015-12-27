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
var cookies_service_1 = require('../../services/cookies.service');
var auth_service_1 = require('../../services/auth.service');
var navbar_1 = require('../../components/navbar/navbar');
var PublicPage = (function () {
    function PublicPage(cookies, authService) {
        this.cookies = cookies;
        this.authService = authService;
    }
    Object.defineProperty(PublicPage.prototype, "idCookie", {
        get: function () {
            return this.cookies.getCookie('id');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PublicPage.prototype, "authenticated", {
        get: function () {
            return this.authService.isAuthenticated();
        },
        enumerable: true,
        configurable: true
    });
    PublicPage = __decorate([
        core_1.Component({
            selector: 'public-page',
            directives: [navbar_1.Navbar],
            pipes: [],
            providers: [],
            template: "\n<div class=\"pos-f-t\">\n    <navbar></navbar>\n</div>\n<div>I'm public: {{xsrfCookie}}</div>\n<div>I'm logged in: {{authenticated}}</div>\n<div class=\"row\">\n<div class=\"col-xs-3\">{{idCookie }}</div>\n</div>\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof cookies_service_1.CookieService !== 'undefined' && cookies_service_1.CookieService) === 'function' && _a) || Object, auth_service_1.AuthService])
    ], PublicPage);
    return PublicPage;
    var _a;
})();
exports.PublicPage = PublicPage;
//# sourceMappingURL=public-page.js.map