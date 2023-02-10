#!/usr/bin/env node

import chalk from 'chalk';
import commander from 'commander';

import { serviceMap } from './services';
import { matcherMap } from './matchers';
import { translate } from '.';

require('dotenv').config();

commander
  .option(
    '-i, --input <inputDir>',
    'the directory containing language directories',
    '.',
  )
  .option(
    '--cache <cacheDir>',
    'set the cache directory',
    '.json-autotranslate-cache',
  )
  .option(
    '-l, --source-language <sourceLang>',
    'specify the source language',
    'en',
  )
  .option(
    '-o, --target-languages <sourceLang>',
    'specify the target languages',
  )
  .option(
    '-t, --type <key-based|natural|auto>',
    `specify the file structure type`,
    /^(key-based|natural|auto)$/,
    'auto',
  )
  .option(
    '-s, --service <service>',
    `selects the service to be used for translation`,
    'google-translate',
  )
  .option('--list-services', `outputs a list of available services`)
  .option(
    '-m, --matcher <matcher>',
    `selects the matcher to be used for interpolations`,
    'icu',
  )
  .option('--list-matchers', `outputs a list of available matchers`)
  .option(
    '-c, --config <value>',
    'supply a config parameter (e.g. path to key file) to the translation service',
  )
  .option(
    '-f, --fix-inconsistencies',
    `automatically fixes inconsistent key-value pairs by setting the value to the key`,
  )
  .option(
    '-d, --delete-unused-strings',
    `deletes strings in translation files that don't exist in the template`,
  )
  .option(
    '--directory-structure <default|ngx-translate>',
    'the locale directory structure',
  )
  .option(
    '--decode-escapes',
    'decodes escaped HTML entities like &#39; into normal UTF-8 characters',
  )
  .parse(process.argv);


if (commander.listServices) {
  console.log('Available services:');
  console.log(Object.keys(serviceMap).join(', '));
  process.exit(0);
}

if (commander.listMatchers) {
  console.log('Available matchers:');
  console.log(Object.keys(matcherMap).join(', '));
  process.exit(0);
}

translate(
  commander.input,
  commander.cacheDir,
  commander.sourceLanguage,
  commander.targetLanguages,
  commander.deleteUnusedStrings,
  commander.type,
  commander.directoryStructure,
  commander.fixInconsistencies,
  commander.service,
  commander.matcher,
  commander.decodeEscapes,
  commander.config,
).catch((e: Error) => {
  console.log();
  console.log(chalk.bgRed('An error has occurred:'));
  console.log(chalk.bgRed(e.message));
  console.log(chalk.bgRed(e.stack));
  console.log();
  process.exit(1);
});
