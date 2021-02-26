const fs = require('fs');
const sharp = require('sharp');
const colors = require('../../utils/colors');
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

    if (background) {
        asset = replace(asset, `<svg`, `<svg style="background-color: ${colors[background] || background}"`);
    }

    switch(format) {
        case `webp`:
            asset = await sharp(asset).toFormat(`webp`).toBuffer();
            mimeType = `image/webp`;
            break;
        case `png`:
            asset = await sharp(asset).toFormat(`png`).toBuffer();
            mimeType = `image/png`;
            break;
        default:
            if (background) {

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