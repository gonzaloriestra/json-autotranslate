import { parse } from 'messageformat-parser';
export var matchIcu = function (input, replacer) {
    var parts = parse(input);
    var regex = new RegExp(parts
        .map(function (part) {
        return typeof part === 'string'
            ? part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            : '(.*)';
    })
        .join(''));
    var matches = input.match(regex);
    return (matches || []).slice(1).map(function (match, index) { return ({
        from: match,
        to: replacer(index)
    }); });
};
