"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.evaluateFilePath = exports.fixSourceInconsistencies = exports.loadTranslations = exports.detectFileType = exports.getAvailableLanguages = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var flatten = __importStar(require("flattenjs"));
exports.getAvailableLanguages = function (directory, directoryStructure) {
    var directoryContent = fs.readdirSync(directory);
    switch (directoryStructure) {
        case 'default':
            return directoryContent
                .map(function (d) { return path.resolve(directory, d); })
                .filter(function (d) { return fs.statSync(d).isDirectory(); })
                .map(function (d) { return path.basename(d); });
        case 'ngx-translate':
            return directoryContent
                .filter(function (f) { return f.endsWith('.json'); })
                .map(function (f) { return f.slice(0, f.indexOf('.')); });
    }
};
exports.detectFileType = function (json) {
    var invalidKeys = Object.keys(json).filter(function (k) { return typeof json[k] === 'string' && (k.includes('.') || k.includes(' ')); });
    return invalidKeys.length > 0 ? 'natural' : 'key-based';
};
exports.loadTranslations = function (directory, fileType) {
    if (fileType === void 0) { fileType = 'auto'; }
    return fs
        .readdirSync(directory)
        .filter(function (f) { return f.endsWith('.json'); })
        .map(function (f) {
        var json = require(path.resolve(directory, f));
        var type = fileType === 'auto' ? exports.detectFileType(json) : fileType;
        return {
            name: f,
            originalContent: json,
            type: type,
            content: type === 'key-based'
                ? flatten.convert(require(path.resolve(directory, f)))
                : require(path.resolve(directory, f))
        };
    });
};
exports.fixSourceInconsistencies = function (directory, cacheDir) {
    var files = exports.loadTranslations(directory).filter(function (f) { return f.type === 'natural'; });
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        var fixedContent = Object.keys(file.content).reduce(function (acc, cur) {
            var _a;
            return (__assign(__assign({}, acc), (_a = {}, _a[cur] = cur, _a)));
        }, {});
        fs.writeFileSync(path.resolve(directory, file.name), JSON.stringify(fixedContent, null, 2) + '\n');
        fs.writeFileSync(path.resolve(cacheDir, file.name), JSON.stringify(fixedContent, null, 2) + '\n');
    }
};
exports.evaluateFilePath = function (directory, dirStructure, lang) {
    switch (dirStructure) {
        case 'default':
            return path.resolve(directory, lang);
        case 'ngx-translate':
            return path.resolve(directory);
    }
};
