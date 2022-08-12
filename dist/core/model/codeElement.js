"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeElement = exports.CodeElementRole = void 0;
var CodeElementRole;
(function (CodeElementRole) {
    CodeElementRole["Primary"] = "Primary";
    CodeElementRole["Supporting"] = "Supporting";
})(CodeElementRole = exports.CodeElementRole || (exports.CodeElementRole = {}));
var CodeElement = /** @class */ (function () {
    function CodeElement() {
        this.role = CodeElementRole.Primary;
        this.size = 0;
    }
    CodeElement.prototype.toDto = function () {
        return JSON.parse(JSON.stringify(this));
    };
    CodeElement.prototype.fromDto = function (dto) {
        var self = this;
        for (var field in dto) {
            self[field] = dto[field];
        }
        return this;
    };
    CodeElement.prototype.equals = function (other) {
        if (!other) {
            return false;
        }
        if (other === this) {
            return true;
        }
        return this.type === other.type;
    };
    return CodeElement;
}());
exports.CodeElement = CodeElement;
