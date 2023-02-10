import { FileType, DirectoryStructure } from './util/file-system';
import { serviceMap } from './services';
import { matcherMap } from './matchers';
export declare const translate: (inputDir: string, cacheDir: string, sourceLang: string, targetLangs: string, deleteUnusedStrings?: boolean, fileType?: FileType, dirStructure?: DirectoryStructure, fixInconsistencies?: boolean, service?: keyof typeof serviceMap, matcher?: keyof typeof matcherMap, decodeEscapes?: boolean, config?: string) => Promise<void>;
