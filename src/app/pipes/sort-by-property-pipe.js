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
var SortByPropertyPipe = (function () {
    function SortByPropertyPipe() {
    }
    SortByPropertyPipe.prototype.transform = function (list, _a) {
        var propertyName = _a[0];
        return list.sort(function (a, b) {
            var aValue = getNestedValue(a, propertyName);
            var bValue = getNestedValue(b, propertyName);
            if (aValue > bValue)
                return 1;
            if (aValue < bValue)
                return -1;
            return 0;
        });
    };
    SortByPropertyPipe = __decorate([
        core_1.Pipe({
            name: "sortByProperty",
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], SortByPropertyPipe);
    return SortByPropertyPipe;
})();
exports.SortByPropertyPipe = SortByPropertyPipe;
function getNestedValue(obj, nestedKey) {
    return nestedKey.split('.').reduce(function (acc, curr) {
        return acc[curr];
    }, obj);
}
//# sourceMappingURL=sort-by-property-pipe.js.map