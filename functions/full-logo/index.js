const fs = require('fs');
const sharp = require('sharp');
const colors = require('../../utils/colors');
const hexToRgb = require('../../utils/hex-to-rgb');
const replace = require('../../utils/replace');

exports.handler = async event => {
    const { color, background, format, padded } = event.queryStringParameters;
    let asset = await fs.promises.readFile(
        require.resolve(`./full-logo${padded ? `-padded` : ``}.svg`)
    );
    let mimeType = `image/svg+xml`;
    
    if (color) {
        asset = replace(asset, `currentColor`, colors[color] || color);
    }

    switch(format) {
        case `webp`:
            asset = sharp(asset).toFormat(`webp`);
            if (background) {
                asset = asset.flatten({
                    background: hexToRgb(colors[background] || background)
                });
            }
            asset = await asset.toFormat(`webp`).toBuffer();
            mimeType = `image/webp`;
            break;
        case `png`:
            asset = sharp(asset);
            if (background) {
                asset = asset.flatten({
                    background: hexToRgb(colors[background] || background)
                });
            }
            asset = await asset.toFormat(`png`).toBuffer();
            mimeType = `image/png`;
            break;
        default:
            if (background) {
                asset = replace(asset, `<svg`, `<svg style="background-color: ${colors[background] || background}"`);
            }
            break;
    }

    return {
        headers: {
            "Content-Type": mimeType,
        },
        body: await asset.toString(`base64`),
        isBase64Encoded: true,
        statusCode: 200,
    };
};