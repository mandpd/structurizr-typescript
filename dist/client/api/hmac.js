"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMd5HmacBase64 = void 0;
var CryptoJS = require("crypto-js");
function getMd5HmacBase64(content) {
    var bytes = CryptoJS.enc.Utf8.parse(content).toString(CryptoJS.enc.Base64);
    var md5 = CryptoJS.MD5(content).toString(CryptoJS.enc.Base64);
    var digest = CryptoJS.enc.Base64.parse(md5).toString();
    var contentMd5Base64Encoded = CryptoJS.enc.Utf8.parse(digest).toString(CryptoJS.enc.Base64);
    return contentMd5Base64Encoded;
}
exports.getMd5HmacBase64 = getMd5HmacBase64;
