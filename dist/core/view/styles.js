"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Styles = exports.ElementStyle = exports.RelationshipStyle = exports.Border = exports.Shape = void 0;
var Shape;
(function (Shape) {
    Shape["Box"] = "Box";
    Shape["RoundedBox"] = "RoundedBox";
    Shape["Circle"] = "Circle";
    Shape["Ellipse"] = "Ellipse";
    Shape["Hexagon"] = "Hexagon";
    Shape["Cylinder"] = "Cylinder";
    Shape["Pipe"] = "Pipe";
    Shape["Person"] = "Person";
    Shape["Robot"] = "Robot";
    Shape["Folder"] = "Folder";
    Shape["WebBrowser"] = "WebBrowser";
    Shape["MobileDevicePortrait"] = "MobileDevicePortrait";
    Shape["MobileDeviceLandscape"] = "MobileDeviceLandscape";
})(Shape = exports.Shape || (exports.Shape = {}));
var Border;
(function (Border) {
    Border["Solid"] = "Solid";
    Border["Dashed"] = "Dashed";
})(Border = exports.Border || (exports.Border = {}));
var RelationshipStyle = /** @class */ (function () {
    function RelationshipStyle(tag) {
        this.tag = tag;
    }
    RelationshipStyle.prototype.toDto = function () {
        return JSON.parse(JSON.stringify(this));
    };
    RelationshipStyle.prototype.fromDto = function (dto) {
        var self = this;
        for (var field in dto) {
            self[field] = dto[field];
        }
        return this;
    };
    return RelationshipStyle;
}());
exports.RelationshipStyle = RelationshipStyle;
var ElementStyle = /** @class */ (function () {
    function ElementStyle(tag) {
        this.tag = tag;
    }
    ElementStyle.prototype.toDto = function () {
        return JSON.parse(JSON.stringify(this));
    };
    ElementStyle.prototype.fromDto = function (dto) {
        var self = this;
        for (var field in dto) {
            self[field] = dto[field];
        }
        return this;
    };
    return ElementStyle;
}());
exports.ElementStyle = ElementStyle;
var Styles = /** @class */ (function () {
    function Styles() {
        this.relationships = [];
        this.elements = [];
    }
    Styles.prototype.addRelationshipStyle = function (style) {
        this.relationships.push(style);
    };
    Styles.prototype.addElementStyle = function (style) {
        this.elements.push(style);
    };
    Styles.prototype.toDto = function () {
        return {
            relationships: this.relationships.map(function (r) { return r.toDto(); }),
            elements: this.elements.map(function (r) { return r.toDto(); }),
        };
    };
    Styles.prototype.fromDto = function (dto) {
        this.relationships = (dto.relationships || []).map(function (r) { return new RelationshipStyle(r.tag).fromDto(r); });
        this.elements = (dto.elements || []).map(function (e) { return new ElementStyle(e.tag).fromDto(e); });
    };
    Styles.prototype.toTheme = function () {
        return {
            elements: this.elements,
            relationships: this.relationships
        };
    };
    return Styles;
}());
exports.Styles = Styles;
