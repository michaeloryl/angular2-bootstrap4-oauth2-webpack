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
var http_1 = require('angular2/http');
var AuthService = (function () {
    function AuthService(windows, http) {
        this.windows = windows;
        this.http = http;
        this.authenticated = false;
        this.expires = 0;
        this.userInfo = {};
        this.windowHandle = null;
        this.intervalId = null;
        this.expiresTimerId = null;
        this.loopCount = 600;
        this.intervalLength = 100;
        this.locationWatcher = new core_1.EventEmitter();
        var oAuth2Config = {
            callbackUrl: 'http://localhost:3000/auth/callback',
            baseUrl: 'https://test.pennmutual.com/oauth2',
            userInfoUrl: "/api/userinfo",
            implicitGrantUrl: "/dialog/authorize?redirect_uri=__callbackUrl__&response_type=token&client_id=__clientId__&scope=__scopes__",
            clientId: 'a2o2demo',
            scopes: 'pml_data_access+basic_access'
        };
        this.oAuthCallbackUrl = oAuth2Config.callbackUrl;
        this.oAuthBaseUrl = oAuth2Config.baseUrl;
        this.oAuthTokenUrl = (oAuth2Config.baseUrl + oAuth2Config.implicitGrantUrl)
            .replace('__callbackUrl__', oAuth2Config.callbackUrl)
            .replace('__clientId__', oAuth2Config.clientId)
            .replace('__scopes__', oAuth2Config.scopes);
        this.oAuthUserUrl = oAuth2Config.baseUrl + oAuth2Config.userInfoUrl;
    }
    AuthService.prototype.doLogin = function () {
        var _this = this;
        var loopCount = this.loopCount;
        this.windowHandle = this.windows.createWindow(this.oAuthTokenUrl, 'OAuth2 Login');
        this.intervalId = setInterval(function () {
            if (loopCount-- < 0) {
                clearInterval(_this.intervalId);
                _this.emitAuthStatus(false);
                _this.windowHandle.close();
            }
            else {
                var href;
                try {
                    href = _this.windowHandle.location.href;
                }
                catch (e) {
                }
                if (href != null) {
                    var re = /.*\/auth\/callback#access_token=(.*)&expires_in=(.*)&token_type=Bearer/;
                    var found = href.match(re);
                    if (found) {
                        clearInterval(_this.intervalId);
                        var expiresSeconds = Number(found[2]);
                        _this.authenticated = true;
                        _this.token = found[1];
                        _this.startExpiresTimer(expiresSeconds);
                        _this.expires = new Date();
                        _this.expires = _this.expires.setSeconds(_this.expires.getSeconds() + expiresSeconds);
                        _this.windowHandle.close();
                        _this.emitAuthStatus(true);
                        _this.fetchUserInfo();
                    }
                }
            }
        }, this.intervalLength);
    };
    AuthService.prototype.doLogout = function () {
        this.authenticated = false;
        this.expiresTimerId = null;
        this.expires = 0;
        this.token = null;
        this.emitAuthStatus(true);
        console.log('Session has expired');
    };
    AuthService.prototype.emitAuthStatus = function (success) {
        this.locationWatcher.emit({ success: success, authenticated: this.authenticated, token: this.token, expires: this.expires });
    };
    AuthService.prototype.getSession = function () {
        return { authenticated: this.authenticated, token: this.token, expires: this.expires };
    };
    AuthService.prototype.fetchUserInfo = function () {
        var _this = this;
        if (this.token != null) {
            var headers = new http_1.Headers();
            headers.append('Authorization', "Bearer " + this.token);
            this.http.get(this.oAuthUserUrl, { headers: headers }).subscribe(function (info) {
                _this.userInfo = JSON.parse(info._body);
            });
        }
    };
    AuthService.prototype.getUserInfo = function () {
        return this.userInfo;
    };
    AuthService.prototype.getUserName = function () {
        return this.userInfo ? this.userInfo.name : null;
    };
    AuthService.prototype.startExpiresTimer = function (seconds) {
        var _this = this;
        if (this.expiresTimerId != null) {
            clearTimeout(this.expiresTimerId);
        }
        this.expiresTimerId = setTimeout(function () {
            _this.doLogout();
        }, seconds * 1000);
        console.log('Token expiration timer set for %s seconds', seconds);
    };
    AuthService.prototype.subscribe = function (onNext, onThrow, onReturn) {
        return this.locationWatcher.subscribe(onNext, onThrow, onReturn);
    };
    AuthService.prototype.isAuthenticated = function () {
        return this.authenticated;
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [window_service_1.WindowService, http_1.Http])
    ], AuthService);
    return AuthService;
})();
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map