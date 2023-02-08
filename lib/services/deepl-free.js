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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.DeepLFree = void 0;
var html_entities_1 = require("html-entities");
var node_fetch_1 = __importDefault(require("node-fetch"));
var matchers_1 = require("../matchers");
var API_ENDPOINT = 'https://api-free.deepl.com/v2';
var DeepLFree = /** @class */ (function () {
    function DeepLFree() {
        this.name = 'DeepL Free';
    }
    DeepLFree.prototype.initialize = function (config, interpolationMatcher, decodeEscapes) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, apiKey, formality, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!config) {
                            throw new Error("Please provide an API key for DeepL Free.");
                        }
                        _a = config.split(','), apiKey = _a[0], formality = _a[1];
                        this.apiKey = apiKey;
                        this.formality =
                            formality === 'less' || formality === 'more' ? formality : 'default';
                        this.interpolationMatcher = interpolationMatcher;
                        _b = this;
                        return [4 /*yield*/, this.fetchLanguages()];
                    case 1:
                        _b.supportedLanguages = _c.sent();
                        this.decodeEscapes = decodeEscapes;
                        return [2 /*return*/];
                }
            });
        });
    };
    DeepLFree.prototype.fetchLanguages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, languages, languageCodes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = new URL(API_ENDPOINT + "/languages");
                        url.searchParams.append('auth_key', this.apiKey);
                        return [4 /*yield*/, node_fetch_1["default"](url.toString())];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Could not fetch supported languages from DeepL Free');
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        languages = _a.sent();
                        languageCodes = languages.flatMap(function (l) { return [
                            l.language,
                            l.language.split('-')[0],
                        ]; });
                        return [2 /*return*/, new Set(languageCodes.map(function (l) { return l.toLowerCase(); }))];
                }
            });
        });
    };
    DeepLFree.prototype.supportsLanguage = function (language) {
        return this.supportedLanguages.has(language.toLowerCase());
    };
    DeepLFree.prototype.translateStrings = function (strings, from, to) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(strings.map(function (string) { return _this.translateString(string, from, to); }))];
            });
        });
    };
    DeepLFree.prototype.translateString = function (string, from, to, triesLeft) {
        if (triesLeft === void 0) { triesLeft = 5; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, clean, replacements, url, response, _b, _c, translated, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = matchers_1.replaceInterpolations(string.value, this.interpolationMatcher), clean = _a.clean, replacements = _a.replacements;
                        url = new URL(API_ENDPOINT + "/translate");
                        url.searchParams.append('text', clean);
                        url.searchParams.append('source_lang', from.toUpperCase());
                        url.searchParams.append('target_lang', to.toUpperCase());
                        url.searchParams.append('auth_key', this.apiKey);
                        url.searchParams.append('formality', this.formality);
                        return [4 /*yield*/, node_fetch_1["default"](String(url))];
                    case 1:
                        response = _e.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        if (response.status === 429 && triesLeft > 0) {
                            return [2 /*return*/, this.translateString(string, from, to, triesLeft - 1)];
                        }
                        _b = Error.bind;
                        _c = "[" + response.status + " " + response.statusText + "]: ";
                        return [4 /*yield*/, response.text()];
                    case 2: throw new (_b.apply(Error, [void 0, _c + ((_e.sent()) || 'Empty body')]))();
                    case 3:
                        _d = matchers_1.reInsertInterpolations;
                        return [4 /*yield*/, response.json()];
                    case 4:
                        translated = _d.apply(void 0, [(_e.sent()).translations[0].text, replacements]);
                        return [2 /*return*/, {
                                key: string.key,
                                value: string.value,
                                translated: this.decodeEscapes ? html_entities_1.decode(translated) : translated
                            }];
                }
            });
        });
    };
    return DeepLFree;
}());
exports.DeepLFree = DeepLFree;
