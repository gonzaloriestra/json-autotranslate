import { GoogleTranslate } from './google-translate';
import { DeepL } from './deepl';
import { DeepLFree } from './deepl-free';
import { DryRun } from './dry-run';
import { AzureTranslator } from './azure-translator';
import { ManualTranslation } from './manual';
import { AmazonTranslate } from './amazon-translate';
export const serviceMap = {
    'google-translate': new GoogleTranslate(),
    deepl: new DeepL(),
    'deepl-free': new DeepLFree(),
    'dry-run': new DryRun(),
    azure: new AzureTranslator(),
    manual: new ManualTranslation(),
    'amazon-translate': new AmazonTranslate(),
};
