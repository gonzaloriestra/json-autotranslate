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
import { Translate } from '@aws-sdk/client-translate';
import { decode } from 'html-entities';
import { reInsertInterpolations, replaceInterpolations } from '../matchers';
import fs from 'fs';
var AmazonTranslate = /** @class */ (function () {
    function AmazonTranslate() {
        this.supportedLanguages = {
            'af': 'af',
            'sq': 'sq',
            'am': 'am',
            'ar': 'ar',
            'hy': 'hy',
            'az': 'az',
            'bn': 'bn',
            'bs': 'bs',
            'bg': 'bg',
            'ca': 'ca',
            'zh': 'zh',
            'zh-tw': 'zh-TW',
            'hr': 'hr',
            'cs': 'cs',
            'da': 'da',
            'fa-af': 'fa-AF',
            'nl': 'nl',
            'en': 'en',
            'et': 'et',
            'fa': 'fa',
            'tl': 'tl',
            'fi': 'fi',
            'fr': 'fr',
            'fr-ca': 'fr-CA',
            'ka': 'ka',
            'de': 'de',
            'el': 'el',
            'gu': 'gu',
            'ht': 'ht',
            'ha': 'ha',
            'he': 'he',
            'hi': 'hi',
            'hu': 'hu',
            'is': 'is',
            'id': 'id',
            'ga': 'ga',
            'it': 'it',
            'ja': 'ja',
            'kn': 'kn',
            'kk': 'kk',
            'ko': 'ko',
            'lv': 'lv',
            'lt': 'lt',
            'mk': 'mk',
            'ms': 'ms',
            'ml': 'ml',
            'mt': 'mt',
            'mr': 'mr',
            'mn': 'mn',
            'no': 'no',
            'ps': 'ps',
            'pl': 'pl',
            'pt': 'pt',
            'pt-pt': 'pt-PT',
            'pa': 'pa',
            'ro': 'ro',
            'ru': 'ru',
            'sr': 'sr',
            'si': 'si',
            'sk': 'sk',
            'sl': 'sl',
            'so': 'so',
            'es': 'es',
            'es-mx': 'es-MX',
            'sw': 'sw',
            'sv': 'sv',
            'ta': 'ta',
            'te': 'te',
            'th': 'th',
            'tr': 'tr',
            'uk': 'uk',
            'ur': 'ur',
            'uz': 'uz',
            'vi': 'vi',
            'cy': 'cy'
        };
        this.name = 'Amazon Translate';
    }
    AmazonTranslate.prototype.initialize = function (config, interpolationMatcher, decodeEscapes) {
        return __awaiter(this, void 0, void 0, function () {
            var configJson;
            return __generator(this, function (_a) {
                configJson = config ? JSON.parse(fs.readFileSync(config).toString()) : {};
                this.translate = new Translate(configJson);
                this.interpolationMatcher = interpolationMatcher;
                this.decodeEscapes = decodeEscapes;
                return [2 /*return*/];
            });
        });
    };
    AmazonTranslate.prototype.supportsLanguage = function (language) {
        return Object.keys(this.supportedLanguages).includes(language.toLowerCase());
    };
    AmazonTranslate.prototype.translateStrings = function (strings, from, to) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(strings.map(function (_a) {
                        var key = _a.key, value = _a.value;
                        return __awaiter(_this, void 0, void 0, function () {
                            var _b, clean, replacements, TranslatedText, reInsterted;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _b = replaceInterpolations(value, this.interpolationMatcher), clean = _b.clean, replacements = _b.replacements;
                                        return [4 /*yield*/, this.translate.translateText({
                                                Text: clean,
                                                SourceLanguageCode: this.supportedLanguages[from.toLowerCase()],
                                                TargetLanguageCode: this.supportedLanguages[to.toLowerCase()]
                                            })];
                                    case 1:
                                        TranslatedText = (_c.sent()).TranslatedText;
                                        reInsterted = reInsertInterpolations(TranslatedText, replacements);
                                        return [2 /*return*/, {
                                                key: key,
                                                value: value,
                                                translated: this.decodeEscapes ? decode(reInsterted) : reInsterted
                                            }];
                                }
                            });
                        });
                    }))];
            });
        });
    };
    return AmazonTranslate;
}());
export { AmazonTranslate };
