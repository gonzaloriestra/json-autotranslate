import { matchIcu } from './icu';
import { matchI18Next } from './i18next';
import { matchSprintf } from './sprintf';
export const xmlStyleReplacer = (index) => `<span translate="no">${index}</span>`;
export const matchNothing = () => [];
export const matcherMap = {
    none: matchNothing,
    icu: matchIcu,
    i18next: matchI18Next,
    sprintf: matchSprintf,
};
export const replaceInterpolations = (input, matcher = matchNothing, replacer = xmlStyleReplacer) => {
    const replacements = matcher(input, replacer);
    const clean = replacements.reduce((acc, cur) => acc.replace(cur.from, cur.to), input);
    return { clean, replacements };
};
export const reInsertInterpolations = (clean, replacements) => replacements.reduce((acc, cur) => acc.replace(cur.to, cur.from), clean);
