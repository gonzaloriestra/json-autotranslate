import { v2 } from '@google-cloud/translate';
import { decode } from 'html-entities';
import { replaceInterpolations, reInsertInterpolations, } from '../matchers';
// Contains replacements for language codes
const codeMap = {
    'zh-tw': 'zh-TW',
    'zh-cn': 'zh-CN',
};
export class GoogleTranslate {
    constructor() {
        this.supportedLanguages = [];
        this.name = 'Google Translate';
    }
    cleanResponse(response) {
        const translated = response.replace(/\<(.+?)\s*\>\s*(.+?)\s*\<\/\s*(.+?)>/g, '<$1>$2</$3>');
        return this.decodeEscapes ? decode(translated) : translated;
    }
    async initialize(config, interpolationMatcher, decodeEscapes) {
        this.translate = new v2.Translate({
            autoRetry: true,
            keyFilename: config || undefined,
        });
        this.interpolationMatcher = interpolationMatcher;
        this.supportedLanguages = await this.getAvailableLanguages();
        this.decodeEscapes = decodeEscapes;
    }
    async getAvailableLanguages() {
        const [languages] = await this.translate.getLanguages();
        console.log(languages);
        return languages.map((l) => l.code.toLowerCase());
    }
    supportsLanguage(language) {
        return this.supportedLanguages.includes(language.toLowerCase());
    }
    cleanLanguageCode(languageCode) {
        const lowerCaseCode = languageCode.toLowerCase();
        if (codeMap[lowerCaseCode]) {
            return codeMap[lowerCaseCode];
        }
        return lowerCaseCode.split('-')[0];
    }
    async translateStrings(strings, from, to) {
        return Promise.all(strings.map(async ({ key, value }) => {
            const { clean, replacements } = replaceInterpolations(value, this.interpolationMatcher);
            const [translationResult] = await this.translate.translate(clean, {
                from: this.cleanLanguageCode(from),
                to: this.cleanLanguageCode(to),
            });
            return {
                key: key,
                value: value,
                translated: this.cleanResponse(reInsertInterpolations(translationResult, replacements)),
            };
        }));
    }
}
