#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var chalk_1 = __importDefault(require("chalk"));
var commander_1 = __importDefault(require("commander"));
var services_1 = require("./services");
var matchers_1 = require("./matchers");
var _1 = require(".");
require('dotenv').config();
commander_1["default"]
    .option('-i, --input <inputDir>', 'the directory containing language directories', '.')
    .option('--cache <cacheDir>', 'set the cache directory', '.json-autotranslate-cache')
    .option('-l, --source-language <sourceLang>', 'specify the source language', 'en')
    .option('-o, --target-languages <sourceLang>', 'specify the target languages')
    .option('-t, --type <key-based|natural|auto>', "specify the file structure type", /^(key-based|natural|auto)$/, 'auto')
    .option('-s, --service <service>', "selects the service to be used for translation", 'google-translate')
    .option('--list-services', "outputs a list of available services")
    .option('-m, --matcher <matcher>', "selects the matcher to be used for interpolations", 'icu')
    .option('--list-matchers', "outputs a list of available matchers")
    .option('-c, --config <value>', 'supply a config parameter (e.g. path to key file) to the translation service')
    .option('-f, --fix-inconsistencies', "automatically fixes inconsistent key-value pairs by setting the value to the key")
    .option('-d, --delete-unused-strings', "deletes strings in translation files that don't exist in the template")
    .option('--directory-structure <default|ngx-translate>', 'the locale directory structure')
    .option('--decode-escapes', 'decodes escaped HTML entities like &#39; into normal UTF-8 characters')
    .parse(process.argv);
if (commander_1["default"].listServices) {
    console.log('Available services:');
    console.log(Object.keys(services_1.serviceMap).join(', '));
    process.exit(0);
}
if (commander_1["default"].listMatchers) {
    console.log('Available matchers:');
    console.log(Object.keys(matchers_1.matcherMap).join(', '));
    process.exit(0);
}
_1.translate(commander_1["default"].input, commander_1["default"].cacheDir, commander_1["default"].sourceLanguage, commander_1["default"].targetLanguages, commander_1["default"].deleteUnusedStrings, commander_1["default"].type, commander_1["default"].directoryStructure, commander_1["default"].fixInconsistencies, commander_1["default"].service, commander_1["default"].matcher, commander_1["default"].decodeEscapes, commander_1["default"].config)["catch"](function (e) {
    console.log();
    console.log(chalk_1["default"].bgRed('An error has occurred:'));
    console.log(chalk_1["default"].bgRed(e.message));
    console.log(chalk_1["default"].bgRed(e.stack));
    console.log();
    process.exit(1);
});
