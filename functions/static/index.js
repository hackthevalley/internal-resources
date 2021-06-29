const mime = require('mime-types');
const fs = require('fs');

exports.handler = async event => {
  const filepath = event.path.replace('/.netlify/functions/static/', './');

  try {
    const asset = await fs.promises.readFile(
      require.resolve(filepath),
    );
    return {
      headers: {
        "Content-Type": mime.lookup(filepath),
      },
      body: asset.toString('base64'),
      isBase64Encoded: true,
      statusCode: 200,
    };
  } catch (err) {
    return {
      body: 'No >:c',
      statusCode: 404,
    };
  }
};
