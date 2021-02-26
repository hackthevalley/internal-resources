module.exports = function hexToRgb(hex) {
    const raw = parseInt(hex.slice(1), 16);
    return {
        r: raw >> 16,
        g: (raw >> 8) & 255,
        b: raw & 255,
    };
}