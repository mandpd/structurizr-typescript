"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Section = void 0;
var Section = /** @class */ (function () {
    function Section() {
    }
    Object.defineProperty(Section.prototype, "elementId", {
        get: function () {
            return this.element ? this.element.id : this._elementId;
        },
        set: function (value) {
            this._elementId = value;
        },
        enumerable: false,
        configurable: true
    });
    Section.prototype.toDto = function () {
        return {
            title: this.title,
            content: this.content,
            format: this.format,
            order: this.order,
            elementId: this.element ? this.element.id : null
        };
    };
    Section.prototype.fromDto = function (dto) {
        this.title = dto.title;
        this.content = dto.content;
        this.format = dto.format;
        this.order = dto.order;
        this.elementId = dto.elementId;
    };
    return Section;
}());
exports.Section = Section;
