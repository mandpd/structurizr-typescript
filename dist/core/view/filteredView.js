"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilteredView = exports.FilterMode = void 0;
var FilterMode;
(function (FilterMode) {
    FilterMode["Include"] = "Include";
    FilterMode["Exclude"] = "Exclude";
})(FilterMode = exports.FilterMode || (exports.FilterMode = {}));
var FilteredView = /** @class */ (function () {
    function FilteredView(baseView, key, description, mode) {
        var tags = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            tags[_i - 4] = arguments[_i];
        }
        this.baseViewKey = baseView ? baseView.key : "";
        this.baseView = baseView;
        this.key = key || "";
        this.description = description || "";
        this.mode = mode || FilterMode.Include;
        this.tags = tags;
    }
    FilteredView.prototype.toDto = function () {
        return {
            key: this.key,
            description: this.description,
            mode: this.mode,
            tags: this.tags,
            baseViewKey: this.baseViewKey
        };
    };
    FilteredView.prototype.fromDto = function (dto) {
        this.key = dto.key;
        this.description = dto.description;
        this.mode = dto.mode;
        this.tags = dto.tags;
        this.baseViewKey = dto.baseViewKey;
    };
    return FilteredView;
}());
exports.FilteredView = FilteredView;
