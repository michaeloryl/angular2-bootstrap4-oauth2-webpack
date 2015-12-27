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
        var _this = this;
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
        http.get('config.json')
            .map(function (res) { return res.json(); })
            .subscribe(function (config) {
            _this.oAuthCallbackUrl = config.callbackUrl;
            _this.oAuthBaseUrl = config.baseUrl;
            _this.oAuthTokenUrl = config.baseUrl + config.implicitGrantUrl;
            _this.oAuthTokenUrl = _this.oAuthTokenUrl
                .replace('__callbackUrl__', config.callbackUrl)
                .replace('__clientId__', config.clientId)
                .replace('__scopes__', config.scopes);
            _this.oAuthUserUrl = config.baseUrl + config.userInfoUrl;
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
                    var re = /#access_token=(.*)/;
                    var found = href.match(re);
                    if (found) {
                        clearInterval(_this.intervalId);
                        var parsed = _this.parse(href.substr(_this.oAuthBaseUrl.length + 1));
                        var expiresSeconds = parsed.expires_in || 1800;
                        _this.token = parsed.access_token;
                        if (_this.token) {
                            _this.authenticated = true;
                        }
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
            this.http.get(this.oAuthUserUrl, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (info) {
                _this.userInfo = info;
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
    AuthService.prototype.parse = function (str) {
        if (typeof str !== 'string') {
            return {};
        }
        str = str.trim().replace(/^(\?|#|&)/, '');
        if (!str) {
            return {};
        }
        return str.split('&').reduce(function (ret, param) {
            var parts = param.replace(/\+/g, ' ').split('=');
            var key = parts.shift();
            var val = parts.length > 0 ? parts.join('=') : undefined;
            key = decodeURIComponent(key);
            val = val === undefined ? null : decodeURIComponent(val);
            if (!ret.hasOwnProperty(key)) {
                ret[key] = val;
            }
            else if (Array.isArray(ret[key])) {
                ret[key].push(val);
            }
            else {
                ret[key] = [ret[key], val];
            }
            return ret;
        }, {});
    };
    ;
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [window_service_1.WindowService, http_1.Http])
    ], AuthService);
    return AuthService;
})();
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map