"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = exports.HttpClient = void 0;
var https = require("https");
var HttpClient = /** @class */ (function () {
    function HttpClient(baseUri) {
        this.baseUri = baseUri;
    }
    HttpClient.prototype.get = function (path, additionalHeaders) {
        return new HttpResponse(this.getRequestOptions(path, "GET", additionalHeaders));
    };
    HttpClient.prototype.put = function (path, content, additionalHeaders) {
        return new HttpResponse(this.getRequestOptions(path, "PUT", additionalHeaders), content);
    };
    HttpClient.prototype.getRequestOptions = function (path, method, additionalHeaders) {
        var headers = additionalHeaders || {};
        return {
            host: this.baseUri,
            protocol: 'https:',
            port: 443,
            path: path,
            method: method,
            headers: headers
        };
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;
var HttpResponse = /** @class */ (function () {
    function HttpResponse(options, content) {
        var _this = this;
        this.data = "";
        this.promise = new Promise(function (resolve, reject) {
            var request = https.request(options, function (r) {
                r.on('data', function (chunk) { _this.data += chunk; });
                r.on('end', function () {
                    resolve(_this.data);
                });
                r.on('error', function (e) {
                    reject(e);
                });
            });
            if (content) {
                request.write(content);
            }
            request.end();
        });
    }
    Object.defineProperty(HttpResponse.prototype, "done", {
        get: function () {
            return this.promise;
        },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(HttpResponse.prototype, "responseBody", {
        get: function () {
            return this.data;
        },
        enumerable: false,
        configurable: true
    });
    return HttpResponse;
}());
exports.HttpResponse = HttpResponse;
