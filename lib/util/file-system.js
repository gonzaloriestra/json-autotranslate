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
import * as fs from 'fs';
import * as path from 'path';
import * as flatten from 'flattenjs';
export var getAvailableLanguages = function (directory, directoryStructure) {
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
                .map(function (f) { return f.slice(0, -5); });
    }
};
export var detectFileType = function (json) {
    var invalidKeys = Object.keys(json).filter(function (k) { return typeof json[k] === 'string' && (k.includes('.') || k.includes(' ')); });
    return invalidKeys.length > 0 ? 'natural' : 'key-based';
};
export var loadTranslations = function (directory, fileType) {
    if (fileType === void 0) { fileType = 'auto'; }
    return fs
        .readdirSync(directory)
        .filter(function (f) { return f.endsWith('.json'); })
        .map(function (f) {
        var json = require(path.resolve(directory, f));
        var type = fileType === 'auto' ? detectFileType(json) : fileType;
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
export var fixSourceInconsistencies = function (directory, cacheDir) {
    var files = loadTranslations(directory).filter(function (f) { return f.type === 'natural'; });
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
export var evaluateFilePath = function (directory, dirStructure, lang) {
    switch (dirStructure) {
        case 'default':
            return path.resolve(directory, lang);
        case 'ngx-translate':
            return path.resolve(directory);
    }
};
