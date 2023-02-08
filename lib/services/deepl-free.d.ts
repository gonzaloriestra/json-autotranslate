import { TranslationService, TranslationResult } from '.';
import { Matcher } from '../matchers';
export declare class DeepLFree implements TranslationService {
    name: string;
    private apiKey;
    private supportedLanguages;
    private interpolationMatcher;
    private decodeEscapes;
    private formality;
    initialize(config?: string, interpolationMatcher?: Matcher, decodeEscapes?: boolean): Promise<void>;
    fetchLanguages(): Promise<Set<string>>;
    supportsLanguage(language: string): boolean;
    translateStrings(strings: {
        key: string;
        value: string;
    }[], from: string, to: string): Promise<TranslationResult[]>;
    translateString(string: {
        key: string;
        value: string;
    }, from: string, to: string, triesLeft?: number): Promise<TranslationResult>;
}
