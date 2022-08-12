"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpHealthCheck = void 0;
var HttpHealthCheck = /** @class */ (function () {
    function HttpHealthCheck() {
        this.headers = {};
    }
    HttpHealthCheck.prototype.equals = function (other) {
        if (!other) {
            return false;
        }
        if (other === this) {
            return true;
        }
        return other.url === this.url;
    };
    HttpHealthCheck.prototype.toDto = function () {
        return {
            name: this.name,
            url: this.url,
            interval: this.interval,
            timeout: this.timeout,
            headers: this.headers
        };
    };
    HttpHealthCheck.prototype.fromDto = function (dto) {
        this.name = dto.name;
        this.url = dto.url;
        this.interval = dto.interval;
        this.timeout = dto.timeout;
        this.headers = dto.headers;
    };
    return HttpHealthCheck;
}());
exports.HttpHealthCheck = HttpHealthCheck;
