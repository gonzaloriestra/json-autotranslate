import inquirer from 'inquirer';
import { replaceInterpolations, reInsertInterpolations, } from '../matchers';
export class ManualTranslation {
    constructor() {
        this.name = 'Manual Translation';
    }
    async initialize(config, interpolationMatcher) {
        this.interpolationMatcher = interpolationMatcher;
    }
    supportsLanguage() {
        return true;
    }
    async translateStrings(strings, from, to) {
        const results = [];
        if (strings.length === 0) {
            return [];
        }
        console.log();
        console.log(`├─┌── Translatable strings:`);
        for (const { key, value } of strings) {
            const { replacements } = replaceInterpolations(value, this.interpolationMatcher);
            process.stdout.write('│ ├── ');
            const result = await inquirer.prompt([
                {
                    name: 'result',
                    message: `[${from} -> ${to}] ${key !== value ? `(${key}) ` : ''}"${value}":`,
                },
            ]);
            results.push({
                key,
                value,
                translated: reInsertInterpolations(result.result, replacements),
            });
        }
        process.stdout.write(`│ └── Done`);
        return results;
    }
}
