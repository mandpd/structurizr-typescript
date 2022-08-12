"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.equals = function (other) {
        return (other === null || other === void 0 ? void 0 : other.username) === this.username && (other === null || other === void 0 ? void 0 : other.role) === this.role;
    };
    User.prototype.toDto = function () {
        return {
            username: this.username,
            role: this.role
        };
    };
    User.prototype.fromDto = function (dto) {
        this.username = dto.username;
        this.role = dto.role;
    };
    return User;
}());
exports.User = User;
