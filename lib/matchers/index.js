import { matchIcu } from './icu';
import { matchI18Next } from './i18next';
import { matchSprintf } from './sprintf';
export var xmlStyleReplacer = function (index) {
    return "<span translate=\"no\">" + index + "</span>";
};
export var matchNothing = function () { return []; };
export var matcherMap = {
    none: matchNothing,
    icu: matchIcu,
    i18next: matchI18Next,
    sprintf: matchSprintf
};
export var replaceInterpolations = function (input, matcher, replacer) {
    if (matcher === void 0) { matcher = matchNothing; }
    if (replacer === void 0) { replacer = xmlStyleReplacer; }
    var replacements = matcher(input, replacer);
    var clean = replacements.reduce(function (acc, cur) { return acc.replace(cur.from, cur.to); }, input);
    return { clean: clean, replacements: replacements };
};
export var reInsertInterpolations = function (clean, replacements) { return replacements.reduce(function (acc, cur) { return acc.replace(cur.to, cur.from); }, clean); };
