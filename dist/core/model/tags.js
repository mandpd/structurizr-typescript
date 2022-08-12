"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tags = void 0;
var Tags = /** @class */ (function () {
    function Tags(_owner) {
        this._owner = _owner;
        this._all = [];
    }
    Tags.prototype.asArray = function () {
        return __spreadArray([], this._all, true);
    };
    Tags.prototype.add = function (tag) {
        this._all.push(tag);
    };
    Tags.prototype.remove = function (tag) {
        this._all.splice(this._all.indexOf(tag), 1);
    };
    Tags.prototype.contains = function (tag) {
        return this._all.indexOf(tag) >= 0;
    };
    Tags.prototype.clear = function () {
        this._all = [];
    };
    Tags.prototype.toDto = function () {
        var all = __spreadArray(__spreadArray([], this._all, true), this._owner.getRequiredTags(), true);
        if (all.length == 0) {
            return "";
        }
        return all.join(",");
    };
    Tags.prototype.fromDto = function (value) {
        this._all = value ? value.split(",") : [];
    };
    Tags.Synchronous = "Synchronous";
    Tags.Asynchronous = "Asynchronous";
    Tags.Relationship = "Relationship";
    Tags.Element = "Element";
    Tags.Person = "Person";
    Tags.SoftwareSystem = "Software System";
    Tags.Container = "Container";
    Tags.Component = "Component";
    Tags.ContainerInstance = "Container Instance";
    return Tags;
}());
exports.Tags = Tags;
