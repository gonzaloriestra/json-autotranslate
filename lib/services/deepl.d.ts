import { TranslationService, TranslationResult } from '.';
import { Matcher } from '../matchers';
export declare class DeepL implements TranslationService {
    name: string;
    private apiKey;
    private supportedLanguages;
    private formalityLanguages;
    private interpolationMatcher;
    private decodeEscapes;
    private formality;
    initialize(config?: string, interpolationMatcher?: Matcher, decodeEscapes?: boolean): Promise<void>;
    fetchLanguages(): Promise<{
        language: string;
        name: string;
        supports_formality: boolean;
    }[]>;
    getFormalityLanguages(languages: Array<{
        language: string;
        name: string;
        supports_formality: boolean;
    }>): Set<string>;
    formatLanguages(languages: Array<{
        language: string;
        name: string;
        supports_formality: boolean;
    }>): Set<string>;
    supportsLanguage(language: string): boolean;
    supportsFormality(language: string): boolean;
    translateStrings(strings: {
        key: string;
        value: string;
    }[], from: string, to: string): Promise<TranslationResult[]>;
    translateString(string: {
        key: string;
        value: string;
    }, from: string, to: string, triesLeft?: number): Promise<TranslationResult>;
}
