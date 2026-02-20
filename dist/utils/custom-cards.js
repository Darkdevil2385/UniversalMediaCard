export function registerCustomCard(params) {
    if (!window.customCards) {
        window.customCards = [];
    }
    window.customCards.push(params);
}
