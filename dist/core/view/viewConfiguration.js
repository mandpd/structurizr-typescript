"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewConfiguration = void 0;
var styles_1 = require("./styles");
var ViewConfiguration = /** @class */ (function () {
    function ViewConfiguration() {
        this.styles = new styles_1.Styles();
        this.terminology = {};
        this.branding = {};
    }
    ViewConfiguration.prototype.toDto = function () {
        return {
            styles: this.styles.toDto(),
            branding: this.branding,
            terminology: this.terminology,
            viewSortOrder: "Default",
            theme: this.theme
        };
    };
    ViewConfiguration.prototype.fromDto = function (dto) {
        if (dto.styles) {
            this.styles.fromDto(dto.styles);
        }
        if (dto.terminology) {
            this.terminology = dto.terminology;
        }
        if (dto.branding) {
            this.branding = dto.branding;
        }
        this.theme = dto.theme;
    };
    return ViewConfiguration;
}());
exports.ViewConfiguration = ViewConfiguration;
