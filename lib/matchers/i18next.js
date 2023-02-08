export const matchI18Next = (input, replacer) => {
    const matches = input.match(/(\{\{.+?\}\}|\$t\(.+?\)|\$\{.+?\})/g);
    return (matches || []).map((match, index) => ({
        from: match,
        to: replacer(index),
    }));
};
