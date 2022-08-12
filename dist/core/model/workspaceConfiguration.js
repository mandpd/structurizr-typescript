"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceConfiguration = void 0;
var user_1 = require("./user");
var WorkspaceConfiguration = /** @class */ (function () {
    function WorkspaceConfiguration() {
        this.users = [];
    }
    WorkspaceConfiguration.prototype.addUser = function (username, role) {
        var existingUser = this.users.find(function (u) { return u.username === username; });
        if (existingUser) {
            if (existingUser.role !== role) {
                throw new Error("The user " + username + " already exists, but with a different role (" + existingUser.role + ")");
            }
            return;
        }
        var user = new user_1.User();
        user.username = username;
        user.role = role;
        this.users.push(user);
    };
    WorkspaceConfiguration.prototype.toDto = function () {
        return {
            users: this.users.map(function (u) { return u.toDto(); })
        };
    };
    WorkspaceConfiguration.prototype.fromDto = function (dto) {
        var _a;
        if (!dto) {
            return;
        }
        this.users = ((_a = dto.users) !== null && _a !== void 0 ? _a : []).map(function (u) {
            var user = new user_1.User();
            user.fromDto(u);
            return user;
        });
    };
    return WorkspaceConfiguration;
}());
exports.WorkspaceConfiguration = WorkspaceConfiguration;
