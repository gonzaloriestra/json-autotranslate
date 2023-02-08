import { parse } from 'messageformat-parser';
export const matchIcu = (input, replacer) => {
    const parts = parse(input);
    const regex = new RegExp(parts
        .map((part) => typeof part === 'string'
        ? part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        : '(.*)')
        .join(''));
    const matches = input.match(regex);
    return (matches || []).slice(1).map((match, index) => ({
        from: match,
        to: replacer(index),
    }));
};
