"use strict";
exports.__esModule = true;
exports.matchIcu = void 0;
var messageformat_parser_1 = require("messageformat-parser");
exports.matchIcu = function (input, replacer) {
    var parts = messageformat_parser_1.parse(input);
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
