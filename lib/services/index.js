"use strict";
exports.__esModule = true;
exports.serviceMap = void 0;
var google_translate_1 = require("./google-translate");
var deepl_1 = require("./deepl");
var deepl_free_1 = require("./deepl-free");
var dry_run_1 = require("./dry-run");
var azure_translator_1 = require("./azure-translator");
var manual_1 = require("./manual");
var amazon_translate_1 = require("./amazon-translate");
exports.serviceMap = {
    'google-translate': new google_translate_1.GoogleTranslate(),
    deepl: new deepl_1.DeepL(),
    'deepl-free': new deepl_free_1.DeepLFree(),
    'dry-run': new dry_run_1.DryRun(),
    azure: new azure_translator_1.AzureTranslator(),
    manual: new manual_1.ManualTranslation(),
    'amazon-translate': new amazon_translate_1.AmazonTranslate()
};
