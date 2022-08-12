"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isChildOf = void 0;
var __1 = require("..");
function isChildOf(e1, e2) {
    if (e1.type === __1.Person.type || e2.type === __1.Person.type) {
        return false;
    }
    var parent = e2.parent;
    while (parent) {
        if (parent.id === e1.id) {
            return true;
        }
        parent = parent.parent;
    }
    return false;
}
exports.isChildOf = isChildOf;
