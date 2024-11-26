export const shortData = (input) => {
    return input.slice().sort((a, b) => b.id - a.id);
}