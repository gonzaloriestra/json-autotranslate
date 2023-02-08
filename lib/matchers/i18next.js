export var matchI18Next = function (input, replacer) {
    var matches = input.match(/(\{\{.+?\}\}|\$t\(.+?\)|\$\{.+?\})/g);
    return (matches || []).map(function (match, index) { return ({
        from: match,
        to: replacer(index)
    }); });
};
