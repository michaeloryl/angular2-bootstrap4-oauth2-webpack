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
var http_1 = require('angular2/http');
var router_1 = require('angular2/router');
var AuthService = (function () {
    function AuthService(http, location) {
        this.authenticated = false;
        this.redirectUrl = 'http://localhost:3000/auth/callback';
        this.oAuthBaseUrl = 'https://test.pennmutual.com/oauth2/dialog/authorize?redirect_uri=${callbackUrl}&response_type=code&client_id=abc123&scope=offline_access+pml_data_access+basic_access';
    }
    AuthService.prototype.doOAuthLogin = function () {
        window.location.href = this.oAuth2URL();
    };
    AuthService.prototype.oAuth2URL = function () {
        return 'https://test.pennmutual.com/oauth2/dialog/authorize?redirect_uri=https://test.pennmutual.com/oauth2/&response_type=code&client_id=abc123&scope=offline_access+pml_data_access+basic_access';
    };
    Object.defineProperty(AuthService.prototype, "isAuthenticated", {
        get: function () {
            return this.authenticated;
        },
        enumerable: true,
        configurable: true
    });
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Location])
    ], AuthService);
    return AuthService;
})();
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map