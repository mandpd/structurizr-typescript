"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decision = void 0;
var Decision = /** @class */ (function () {
    function Decision() {
    }
    Object.defineProperty(Decision.prototype, "elementId", {
        get: function () {
            return this.element ? this.element.id : this._elementId;
        },
        set: function (value) {
            this._elementId = value;
        },
        enumerable: false,
        configurable: true
    });
    Decision.prototype.toDto = function () {
        return {
            id: this.id,
            date: this.date.toISOString(),
            status: this.status,
            title: this.title,
            content: this.content,
            format: this.format,
            elementId: this.elementId
        };
    };
    Decision.prototype.fromDto = function (dto) {
        this.id = dto.id;
        this.date = new Date(dto.date);
        this.status = dto.status;
        this.title = dto.title;
        this.content = dto.content;
        this.format = dto.format;
        this.elementId = dto.elementId;
    };
    return Decision;
}());
exports.Decision = Decision;
