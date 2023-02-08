export const matchSprintf = (input, replacer) => {
    const matches = input.match(/(%.)/g);
    return (matches || []).map((match, index) => ({
        from: match,
        to: replacer(index),
    }));
};
