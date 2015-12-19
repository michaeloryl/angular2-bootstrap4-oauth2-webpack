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
var window_service_1 = require('./window.service');
var AuthService = (function () {
    function AuthService(windows) {
        this.windows = windows;
        this.authenticated = false;
        this.windowHandle = null;
        this.callbackTokenUrl = 'http://localhost:3000/%23/auth/callback';
        this.callbackCodeUrl = 'http://localhost:3000/auth/callback';
        this.oAuthCodeUrl = "https://test.pennmutual.com/oauth2/dialog/authorize?redirect_uri=" + this.callbackCodeUrl + "&response_type=code&client_id=a2o2demo&scope=pml_data_access+basic_access";
        this.oAuthTokenUrl = "https://test.pennmutual.com/oauth2/dialog/authorize?redirect_uri=" + this.callbackTokenUrl + "&response_type=token&client_id=a2o2demo&scope=pml_data_access+basic_access";
        this.useToken = true;
    }
    AuthService.prototype.doOAuthLogin = function () {
        this.windowHandle = this.windows.createWindow(this.oAuth2URL(), 'OAuth2 Login');
    };
    AuthService.prototype.oAuth2URL = function () {
        return (this.useToken ? this.oAuthTokenUrl : this.oAuthCodeUrl);
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
        __metadata('design:paramtypes', [window_service_1.WindowService])
    ], AuthService);
    return AuthService;
})();
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map