// Simplifed version of https://github.com/juliangruber/buffer-replace
module.exports = function replace(asset, from, to) {
    const idx = asset.indexOf(from);
    const before = asset.slice(0, idx);
    const after = asset.slice(idx + from.length);

    to = Buffer.from(to);
    return Buffer.concat([
        before,
        to,
        after,
    ], idx + to.length + after.length);
}