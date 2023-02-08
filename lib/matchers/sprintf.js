"use strict";
exports.__esModule = true;
exports.matchSprintf = void 0;
exports.matchSprintf = function (input, replacer) {
    var matches = input.match(/(%.)/g);
    return (matches || []).map(function (match, index) { return ({
        from: match,
        to: replacer(index)
    }); });
};
