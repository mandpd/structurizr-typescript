"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructurizrClient = void 0;
var workspace_1 = require("../../core/model/workspace");
var CryptoJS = require("crypto-js");
var httpClient_1 = require("./httpClient");
var StructurizrClient = /** @class */ (function () {
    function StructurizrClient(apiKey, apiSecret, url) {
        if (url === void 0) { url = "api.structurizr.com"; }
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.url = url;
        this.mergeFromRemote = true;
        this.verbose = false;
        this.httpClient = new httpClient_1.HttpClient(url);
    }
    StructurizrClient.prototype.getWorkspace = function (workspaceId) {
        var nonce = Date.now() + "";
        var md5Digest = this.getMD5digest("");
        var response = this.httpClient.get("/workspace/" + workspaceId, this.headers(workspaceId, "GET", md5Digest, nonce));
        return response.done.then(function (j) {
            var dto = JSON.parse(j);
            if (!dto || dto["success"] != undefined && !dto["success"]) {
                throw new Error("Response from API seems to indicate an error: " + j);
            }
            var w = new workspace_1.Workspace("", "");
            w.fromDto(JSON.parse(j));
            w.hydrate();
            return w;
        });
    };
    StructurizrClient.prototype.putWorkspace = function (workspaceId, workspace) {
        return __awaiter(this, void 0, void 0, function () {
            var remoteWorkspace, dto, json, nonce, md5Digest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.mergeFromRemote) return [3 /*break*/, 2];
                        this.log("Starting to get remote workspace for layout merging");
                        return [4 /*yield*/, this.getWorkspace(workspaceId)];
                    case 1:
                        remoteWorkspace = _a.sent();
                        this.log("Gott remote workspace for layout merging");
                        workspace.views.copyLayoutInformationFrom(remoteWorkspace.views);
                        this.log("Merged layout with remote workspace");
                        _a.label = 2;
                    case 2:
                        workspace.id = workspaceId;
                        workspace.lastModifiedDate = new Date();
                        dto = workspace.toDto();
                        json = JSON.stringify(dto);
                        this.log("Serialized workspace:");
                        this.log(json);
                        nonce = Date.now() + "";
                        md5Digest = this.getMD5digest(json);
                        return [2 /*return*/, this.httpClient.put("/workspace/" + workspaceId, json, this.headers(workspaceId, "PUT", md5Digest, nonce, json)).done];
                }
            });
        });
    };
    StructurizrClient.prototype.headers = function (workspaceId, method, md5Digest, nonce, json) {
        var headers = {
            "X-Authorization": this.getAuthorizationHeader(method, workspaceId, md5Digest, nonce, json),
            "User-Agent": "structurizr-typescript/0.0.3",
            "Nonce": nonce
        };
        if (json) {
            headers["Content-Type"] = "application/json; charset=UTF-8";
            headers["Content-MD5"] = this.toBase64EncodedUTF8(md5Digest);
        }
        return headers;
    };
    StructurizrClient.prototype.getAuthorizationHeader = function (method, workspaceId, md5Digest, nonce, json) {
        var hmac = this.gethmac(method, "/workspace/" + workspaceId, md5Digest, json ? "application/json; charset=UTF-8" : "", nonce);
        var authHeader = this.apiKey + ":" + this.toBase64EncodedUTF8(hmac);
        return authHeader;
    };
    StructurizrClient.prototype.gethmac = function (method, path, md5, contentType, nonce) {
        var content = method + "\n" + path + "\n" + md5 + "\n" + contentType + "\n" + nonce + "\n";
        var contentBytes = CryptoJS.enc.Utf8.parse(content);
        var apiSecretBytes = CryptoJS.enc.Utf8.parse(this.apiSecret);
        var hash = CryptoJS.HmacSHA256(contentBytes, apiSecretBytes);
        var hmac = hash.toString();
        return hmac;
    };
    StructurizrClient.prototype.getMD5digest = function (content) {
        var md5 = CryptoJS.MD5(content).toString(CryptoJS.enc.Base64);
        var digest = CryptoJS.enc.Base64.parse(md5).toString();
        return digest;
    };
    StructurizrClient.prototype.toBase64EncodedUTF8 = function (text) {
        return CryptoJS.enc.Utf8.parse(text).toString(CryptoJS.enc.Base64);
    };
    StructurizrClient.prototype.log = function (message) {
        if (this.verbose) {
            console.log(message);
        }
    };
    return StructurizrClient;
}());
exports.StructurizrClient = StructurizrClient;
