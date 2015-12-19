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
var WindowService = (function () {
    function WindowService() {
    }
    WindowService.prototype.createWindow = function (url, name, width, height, left, top) {
        if (name === void 0) { name = 'Window'; }
        if (width === void 0) { width = 400; }
        if (height === void 0) { height = 600; }
        if (left === void 0) { left = 0; }
        if (top === void 0) { top = 0; }
        if (url == null) {
            return null;
        }
        var options = "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top;
        console.log("Window options: ", options);
        return window.open(url, name, options);
    };
    WindowService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], WindowService);
    return WindowService;
})();
exports.WindowService = WindowService;
//# sourceMappingURL=window.service.js.map