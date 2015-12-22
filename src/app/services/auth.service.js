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
require('rxjs/add/observable/interval');
require('rxjs/add/observable/timer');
require('rxjs/add/operator/takeWhile');
var AuthService = (function () {
    function AuthService(windows) {
        this.windows = windows;
        this.callbackTokenUrl = 'http://localhost:3000/auth/callback';
        this.oAuthTokenUrl = "https://test.pennmutual.com/oauth2/dialog/authorize?redirect_uri=" + this.callbackTokenUrl + "&response_type=token&client_id=a2o2demo&scope=pml_data_access+basic_access";
        this.authenticated = false;
        this.expires = 0;
        this.userInfo = {};
        this.windowHandle = null;
        this.intervalId = null;
        this.expiresTimerId = null;
        this.loopCount = 600;
        this.intervalLength = 100;
        this.locationWatcher = new core_1.EventEmitter();
        this.subscription = this.getEvent().subscribe(function (val) {
            console.log('Received:', val);
        }, function (err) {
            console.log('Received error:', err);
        }, function () {
            console.log('Completed');
        });
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
                        _this.setExpiresTimer(expiresSeconds);
                        _this.expires = new Date();
                        _this.expires = _this.expires.setSeconds(_this.expires.getSeconds() + expiresSeconds);
                        _this.windowHandle.close();
                        _this.emitAuthStatus(true);
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
    };
    AuthService.prototype.getUserInfo = function () {
        return this.userInfo;
    };
    AuthService.prototype.setExpiresTimer = function (seconds) {
        var _this = this;
        if (this.expiresTimerId != null) {
            clearTimeout(this.expiresTimerId);
        }
        this.expiresTimerId = setTimeout(function () {
            _this.doLogout();
        }, seconds * 1000);
        console.log('Token expiration timer set for %s seconds', seconds);
    };
    AuthService.prototype.getEvent = function () {
        return this.locationWatcher;
    };
    AuthService.prototype.oAuth2URL = function () {
        return this.oAuthTokenUrl;
    };
    AuthService.prototype.isAuthenticated = function () {
        return this.authenticated;
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [window_service_1.WindowService])
    ], AuthService);
    return AuthService;
})();
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map