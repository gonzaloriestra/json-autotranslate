"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.translate = void 0;
var file_system_1 = require("./util/file-system");
var services_1 = require("./services");
var matchers_1 = require("./matchers");
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var chalk_1 = __importDefault(require("chalk"));
var flatten = __importStar(require("flattenjs"));
var deep_object_diff_1 = require("deep-object-diff");
var ncp_1 = __importDefault(require("ncp"));
var lodash_1 = require("lodash");
exports.translate = function (inputDir, cacheDir, sourceLang, targetLangs, deleteUnusedStrings, fileType, dirStructure, fixInconsistencies, service, matcher, decodeEscapes, config) {
    if (inputDir === void 0) { inputDir = '.'; }
    if (cacheDir === void 0) { cacheDir = '.json-autotranslate-cache'; }
    if (sourceLang === void 0) { sourceLang = 'en'; }
    if (deleteUnusedStrings === void 0) { deleteUnusedStrings = false; }
    if (fileType === void 0) { fileType = 'auto'; }
    if (dirStructure === void 0) { dirStructure = 'default'; }
    if (fixInconsistencies === void 0) { fixInconsistencies = false; }
    if (service === void 0) { service = 'google-translate'; }
    if (matcher === void 0) { matcher = 'icu'; }
    if (decodeEscapes === void 0) { decodeEscapes = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var workingDir, resolvedCacheDir, availableLanguages, targetLanguages, translationService, templateFilePath, templateFiles, _i, templateFiles_1, file, inconsistentFiles, _loop_1, _a, _b, file, invalidFiles, _loop_2, _c, _d, file, totalAddedTranslations, totalRemovedTranslations, _loop_3, _e, targetLanguages_1, language;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    workingDir = path.resolve(process.cwd(), inputDir);
                    resolvedCacheDir = path.resolve(process.cwd(), cacheDir);
                    availableLanguages = file_system_1.getAvailableLanguages(workingDir, dirStructure);
                    targetLanguages = (targetLangs === null || targetLangs === void 0 ? void 0 : targetLangs.split(',')) || availableLanguages.filter(function (f) { return f !== sourceLang; });
                    if (!fs.existsSync(resolvedCacheDir)) {
                        fs.mkdirSync(resolvedCacheDir);
                        console.log("\uD83D\uDDC2 Created the cache directory.");
                    }
                    if (!availableLanguages.includes(sourceLang)) {
                        throw new Error("The source language " + sourceLang + " doesn't exist.");
                    }
                    if (typeof services_1.serviceMap[service] === 'undefined') {
                        throw new Error("The service " + service + " doesn't exist.");
                    }
                    if (typeof matchers_1.matcherMap[matcher] === 'undefined') {
                        throw new Error("The matcher " + matcher + " doesn't exist.");
                    }
                    translationService = services_1.serviceMap[service];
                    templateFilePath = file_system_1.evaluateFilePath(workingDir, dirStructure, sourceLang);
                    templateFiles = file_system_1.loadTranslations(templateFilePath, fileType);
                    if (templateFiles.length === 0) {
                        throw new Error("The source language " + sourceLang + " doesn't contain any JSON files.");
                    }
                    console.log(chalk_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["Found {green.bold ", "} target language(s):"], ["Found {green.bold ",
                        "} target language(s):"])), String(targetLanguages.length)));
                    console.log("-> " + targetLanguages.join(', '));
                    console.log();
                    console.log("\uD83C\uDFED Loading source files...");
                    for (_i = 0, templateFiles_1 = templateFiles; _i < templateFiles_1.length; _i++) {
                        file = templateFiles_1[_i];
                        console.log(chalk_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\u251C\u2500\u2500 ", " (", ")"], ["\u251C\u2500\u2500 ", " (", ")"])), String(file.name), file.type));
                    }
                    console.log(chalk_1["default"](templateObject_3 || (templateObject_3 = __makeTemplateObject(["\u2514\u2500\u2500 {green.bold Done}"], ["\u2514\u2500\u2500 {green.bold Done}"]))));
                    console.log();
                    console.log("\u2728 Initializing " + translationService.name + "...");
                    return [4 /*yield*/, translationService.initialize(config, matchers_1.matcherMap[matcher], decodeEscapes)];
                case 1:
                    _f.sent();
                    console.log(chalk_1["default"](templateObject_4 || (templateObject_4 = __makeTemplateObject(["\u2514\u2500\u2500 {green.bold Done}"], ["\u2514\u2500\u2500 {green.bold Done}"]))));
                    console.log();
                    if (!translationService.supportsLanguage(sourceLang)) {
                        throw new Error(translationService.name + " doesn't support the source language " + sourceLang);
                    }
                    console.log("\uD83D\uDD0D Looking for key-value inconsistencies in source files...");
                    inconsistentFiles = [];
                    _loop_1 = function (file) {
                        var inconsistentKeys = Object.keys(file.content).filter(function (key) { return key !== file.content[key]; });
                        if (inconsistentKeys.length > 0) {
                            inconsistentFiles.push(file.name);
                            console.log(chalk_1["default"](templateObject_5 || (templateObject_5 = __makeTemplateObject(["\u251C\u2500\u2500 {yellow.bold ", " contains} {red.bold ", "} {yellow.bold inconsistent key(s)}"], ["\u251C\u2500\u2500 {yellow.bold ", " contains} {red.bold ",
                                "} {yellow.bold inconsistent key(s)}"])), file.name, String(inconsistentKeys.length)));
                        }
                    };
                    for (_a = 0, _b = templateFiles.filter(function (f) { return f.type === 'natural'; }); _a < _b.length; _a++) {
                        file = _b[_a];
                        _loop_1(file);
                    }
                    if (inconsistentFiles.length > 0) {
                        console.log(chalk_1["default"](templateObject_6 || (templateObject_6 = __makeTemplateObject(["\u2514\u2500\u2500 {yellow.bold Found key-value inconsistencies in} {red.bold ", "} {yellow.bold file(s).}"], ["\u2514\u2500\u2500 {yellow.bold Found key-value inconsistencies in} {red.bold ",
                            "} {yellow.bold file(s).}"])), String(inconsistentFiles.length)));
                        console.log();
                        if (fixInconsistencies) {
                            console.log("\uD83D\uDC9A Fixing inconsistencies...");
                            file_system_1.fixSourceInconsistencies(templateFilePath, file_system_1.evaluateFilePath(resolvedCacheDir, dirStructure, sourceLang));
                            console.log(chalk_1["default"](templateObject_7 || (templateObject_7 = __makeTemplateObject(["\u2514\u2500\u2500 {green.bold Fixed all inconsistencies.}"], ["\u2514\u2500\u2500 {green.bold Fixed all inconsistencies.}"]))));
                        }
                        else {
                            console.log(chalk_1["default"](templateObject_8 || (templateObject_8 = __makeTemplateObject(["Please either fix these inconsistencies manually or supply the {green.bold -f} flag to automatically fix them."], ["Please either fix these inconsistencies manually or supply the {green.bold -f} flag to automatically fix them."]))));
                        }
                    }
                    else {
                        console.log(chalk_1["default"](templateObject_9 || (templateObject_9 = __makeTemplateObject(["\u2514\u2500\u2500 {green.bold No inconsistencies found}"], ["\u2514\u2500\u2500 {green.bold No inconsistencies found}"]))));
                    }
                    console.log();
                    console.log("\uD83D\uDD0D Looking for invalid keys in source files...");
                    invalidFiles = [];
                    _loop_2 = function (file) {
                        var invalidKeys = Object.keys(file.originalContent).filter(function (k) { return typeof file.originalContent[k] === 'string' && k.includes(' '); });
                        if (invalidKeys.length > 0) {
                            invalidFiles.push(file.name);
                            console.log(chalk_1["default"](templateObject_10 || (templateObject_10 = __makeTemplateObject(["\u251C\u2500\u2500 {yellow.bold ", " contains} {red.bold ", "} {yellow.bold invalid key(s)}"], ["\u251C\u2500\u2500 {yellow.bold ", " contains} {red.bold ",
                                "} {yellow.bold invalid key(s)}"])), file.name, String(invalidKeys.length)));
                        }
                    };
                    for (_c = 0, _d = templateFiles.filter(function (f) { return f.type === 'key-based'; }); _c < _d.length; _c++) {
                        file = _d[_c];
                        _loop_2(file);
                    }
                    if (invalidFiles.length) {
                        console.log(chalk_1["default"](templateObject_11 || (templateObject_11 = __makeTemplateObject(["\u2514\u2500\u2500 {yellow.bold Found invalid keys in} {red.bold ", "} {yellow.bold file(s).}"], ["\u2514\u2500\u2500 {yellow.bold Found invalid keys in} {red.bold ",
                            "} {yellow.bold file(s).}"])), String(invalidFiles.length)));
                        console.log();
                        console.log(chalk_1["default"](templateObject_12 || (templateObject_12 = __makeTemplateObject(["It looks like you're trying to use the key-based mode on natural-language-style JSON files."], ["It looks like you're trying to use the key-based mode on natural-language-style JSON files."]))));
                        console.log(chalk_1["default"](templateObject_13 || (templateObject_13 = __makeTemplateObject(["Please make sure that your keys don't contain periods (.) or remove the {green.bold --type} / {green.bold -t} option."], ["Please make sure that your keys don't contain periods (.) or remove the {green.bold --type} / {green.bold -t} option."]))));
                        console.log();
                        process.exit(1);
                    }
                    else {
                        console.log(chalk_1["default"](templateObject_14 || (templateObject_14 = __makeTemplateObject(["\u2514\u2500\u2500 {green.bold No invalid keys found}"], ["\u2514\u2500\u2500 {green.bold No invalid keys found}"]))));
                    }
                    console.log();
                    totalAddedTranslations = 0;
                    totalRemovedTranslations = 0;
                    _loop_3 = function (language) {
                        var translateContent, _a, existingFiles, templateFileNames_1, deletableFiles, _i, deletableFiles_1, file, cacheFile, _loop_4, _b, templateFiles_2, templateFile, sourceFile, _c, addedTranslations, removedTranslations;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    if (!translationService.supportsLanguage(language)) {
                                        console.log(chalk_1["default"](templateObject_15 || (templateObject_15 = __makeTemplateObject(["\uD83D\uDE48 {yellow.bold ", " doesn't support} {red.bold ", "}{yellow.bold . Skipping this language.}"], ["\uD83D\uDE48 {yellow.bold ", " doesn't support} {red.bold ", "}{yellow.bold . Skipping this language.}"])), translationService.name, language));
                                        console.log();
                                        return [2 /*return*/, "continue"];
                                    }
                                    console.log(chalk_1["default"](templateObject_16 || (templateObject_16 = __makeTemplateObject(["\uD83D\uDCAC Translating strings from {green.bold ", "} to {green.bold ", "}..."], ["\uD83D\uDCAC Translating strings from {green.bold ", "} to {green.bold ", "}..."])), sourceLang, language));
                                    translateContent = createTranslator(translationService, service, sourceLang, language, cacheDir, workingDir, dirStructure, deleteUnusedStrings);
                                    _a = dirStructure;
                                    switch (_a) {
                                        case 'default': return [3 /*break*/, 1];
                                        case 'ngx-translate': return [3 /*break*/, 6];
                                    }
                                    return [3 /*break*/, 8];
                                case 1:
                                    existingFiles = file_system_1.loadTranslations(file_system_1.evaluateFilePath(workingDir, dirStructure, language), fileType);
                                    if (deleteUnusedStrings) {
                                        templateFileNames_1 = templateFiles.map(function (t) { return t.name; });
                                        deletableFiles = existingFiles.filter(function (f) { return !templateFileNames_1.includes(f.name); });
                                        for (_i = 0, deletableFiles_1 = deletableFiles; _i < deletableFiles_1.length; _i++) {
                                            file = deletableFiles_1[_i];
                                            console.log(chalk_1["default"](templateObject_17 || (templateObject_17 = __makeTemplateObject(["\u251C\u2500\u2500 {red.bold ", " is no longer used and will be deleted.}"], ["\u251C\u2500\u2500 {red.bold ", " is no longer used and will be deleted.}"])), file.name));
                                            fs.unlinkSync(path.resolve(file_system_1.evaluateFilePath(workingDir, dirStructure, language), file.name));
                                            cacheFile = path.resolve(file_system_1.evaluateFilePath(workingDir, dirStructure, language), file.name);
                                            if (fs.existsSync(cacheFile)) {
                                                fs.unlinkSync(cacheFile);
                                            }
                                        }
                                    }
                                    _loop_4 = function (templateFile) {
                                        var _a, addedTranslations_1, removedTranslations_1;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    process.stdout.write("\u251C\u2500\u2500 Translating " + templateFile.name);
                                                    return [4 /*yield*/, translateContent(templateFile, existingFiles.find(function (f) { return f.name === templateFile.name; }))];
                                                case 1:
                                                    _a = _b.sent(), addedTranslations_1 = _a[0], removedTranslations_1 = _a[1];
                                                    totalAddedTranslations += addedTranslations_1;
                                                    totalRemovedTranslations += removedTranslations_1;
                                                    return [2 /*return*/];
                                            }
                                        });
                                    };
                                    _b = 0, templateFiles_2 = templateFiles;
                                    _d.label = 2;
                                case 2:
                                    if (!(_b < templateFiles_2.length)) return [3 /*break*/, 5];
                                    templateFile = templateFiles_2[_b];
                                    return [5 /*yield**/, _loop_4(templateFile)];
                                case 3:
                                    _d.sent();
                                    _d.label = 4;
                                case 4:
                                    _b++;
                                    return [3 /*break*/, 2];
                                case 5: return [3 /*break*/, 8];
                                case 6:
                                    sourceFile = templateFiles.find(function (f) { return f.name === sourceLang + ".json"; });
                                    if (!sourceFile) {
                                        throw new Error('Could not find source file. This is a bug.');
                                    }
                                    return [4 /*yield*/, translateContent(sourceFile, templateFiles.find(function (f) { return f.name === language + ".json"; }))];
                                case 7:
                                    _c = _d.sent(), addedTranslations = _c[0], removedTranslations = _c[1];
                                    totalAddedTranslations += addedTranslations;
                                    totalRemovedTranslations += removedTranslations;
                                    return [3 /*break*/, 8];
                                case 8:
                                    console.log(chalk_1["default"](templateObject_18 || (templateObject_18 = __makeTemplateObject(["\u2514\u2500\u2500 {green.bold All strings have been translated.}"], ["\u2514\u2500\u2500 {green.bold All strings have been translated.}"]))));
                                    console.log();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _e = 0, targetLanguages_1 = targetLanguages;
                    _f.label = 2;
                case 2:
                    if (!(_e < targetLanguages_1.length)) return [3 /*break*/, 5];
                    language = targetLanguages_1[_e];
                    return [5 /*yield**/, _loop_3(language)];
                case 3:
                    _f.sent();
                    _f.label = 4;
                case 4:
                    _e++;
                    return [3 /*break*/, 2];
                case 5:
                    if (!(service !== 'dry-run')) return [3 /*break*/, 7];
                    console.log('🗂 Caching source translation files...');
                    return [4 /*yield*/, new Promise(function (res, rej) {
                            return ncp_1["default"](file_system_1.evaluateFilePath(workingDir, dirStructure, sourceLang), file_system_1.evaluateFilePath(resolvedCacheDir, dirStructure, sourceLang), function (err) { return (err ? rej() : res(null)); });
                        })];
                case 6:
                    _f.sent();
                    console.log(chalk_1["default"](templateObject_19 || (templateObject_19 = __makeTemplateObject(["\u2514\u2500\u2500 {green.bold Translation files have been cached.}"], ["\u2514\u2500\u2500 {green.bold Translation files have been cached.}"]))));
                    console.log();
                    _f.label = 7;
                case 7:
                    console.log(chalk_1["default"].green.bold(totalAddedTranslations + " new translations have been added!"));
                    if (totalRemovedTranslations > 0) {
                        console.log(chalk_1["default"].green.bold(totalRemovedTranslations + " translations have been removed!"));
                    }
                    return [2 /*return*/];
            }
        });
    });
};
function createTranslator(translationService, service, sourceLang, targetLang, cacheDir, workingDir, dirStructure, deleteUnusedStrings) {
    var _this = this;
    return function (sourceFile, destinationFile) { return __awaiter(_this, void 0, void 0, function () {
        var cachePath, cacheDiff, cachedFile, cDiff_1, changedItems, existingKeys, templateStrings, stringsToTranslate, unusedStrings, translatedStrings, newKeys, existingTranslations, translatedFile, newContent, languageCachePath;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    cachePath = path.resolve(file_system_1.evaluateFilePath(cacheDir, dirStructure, sourceLang), sourceFile ? sourceFile.name : '');
                    cacheDiff = [];
                    if (fs.existsSync(cachePath) && !fs.statSync(cachePath).isDirectory()) {
                        cachedFile = flatten.convert(JSON.parse(fs.readFileSync(cachePath).toString().trim()));
                        cDiff_1 = deep_object_diff_1.diff(cachedFile, sourceFile.content);
                        cacheDiff = Object.keys(cDiff_1).filter(function (k) { return cDiff_1[k]; });
                        changedItems = Object.keys(cacheDiff).length.toString();
                        process.stdout.write(chalk_1["default"](templateObject_20 || (templateObject_20 = __makeTemplateObject([" ({green.bold ", "} changes from cache)"], [" ({green.bold ", "} changes from cache)"])), changedItems));
                    }
                    existingKeys = destinationFile
                        ? Object.keys(destinationFile.content)
                        : [];
                    templateStrings = Object.keys(sourceFile.content);
                    stringsToTranslate = templateStrings
                        .filter(function (key) { return !existingKeys.includes(key) || cacheDiff.includes(key); })
                        .map(function (key) { return ({
                        key: key,
                        value: sourceFile.type === 'key-based' ? sourceFile.content[key] : key
                    }); });
                    unusedStrings = existingKeys.filter(function (key) { return !templateStrings.includes(key); });
                    return [4 /*yield*/, translationService.translateStrings(stringsToTranslate, sourceLang, targetLang)];
                case 1:
                    translatedStrings = _c.sent();
                    newKeys = translatedStrings.reduce(function (acc, cur) {
                        var _a;
                        return (__assign(__assign({}, acc), (_a = {}, _a[cur.key] = cur.translated, _a)));
                    }, {});
                    if (service !== 'dry-run') {
                        existingTranslations = destinationFile
                            ? destinationFile.content
                            : {};
                        translatedFile = __assign(__assign({}, lodash_1.omit(existingTranslations, deleteUnusedStrings ? unusedStrings : [])), newKeys);
                        newContent = JSON.stringify(sourceFile.type === 'key-based'
                            ? flatten.undo(translatedFile)
                            : translatedFile, null, 2) + "\n";
                        fs.writeFileSync(path.resolve(file_system_1.evaluateFilePath(workingDir, dirStructure, targetLang), (_a = destinationFile === null || destinationFile === void 0 ? void 0 : destinationFile.name) !== null && _a !== void 0 ? _a : sourceFile.name), newContent);
                        languageCachePath = file_system_1.evaluateFilePath(cacheDir, dirStructure, targetLang);
                        if (!fs.existsSync(languageCachePath)) {
                            fs.mkdirSync(languageCachePath);
                        }
                        fs.writeFileSync(path.resolve(languageCachePath, (_b = destinationFile === null || destinationFile === void 0 ? void 0 : destinationFile.name) !== null && _b !== void 0 ? _b : sourceFile.name), JSON.stringify(translatedFile, null, 2) + '\n');
                    }
                    console.log(deleteUnusedStrings && unusedStrings.length > 0
                        ? chalk_1["default"](templateObject_21 || (templateObject_21 = __makeTemplateObject([" ({green.bold +", "}/{red.bold -", "})"], [" ({green.bold +",
                            "}/{red.bold -", "})"])), String(translatedStrings.length), String(unusedStrings.length)) : chalk_1["default"](templateObject_22 || (templateObject_22 = __makeTemplateObject([" ({green.bold +", "})"], [" ({green.bold +", "})"])), String(translatedStrings.length)));
                    // Added translations and removed translations
                    return [2 /*return*/, [
                            translatedStrings.length,
                            deleteUnusedStrings ? unusedStrings.length : 0,
                        ]];
            }
        });
    }); };
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22;
