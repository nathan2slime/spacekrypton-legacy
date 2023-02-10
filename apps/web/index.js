const { createServer } = require('http');
const { parse } = require('url');
const fs = require('fs');
const path = require('path');
const next = require('next');
const { hydrateDocument, renderToString } = require('@kry/core/hydrate');

const dev = process.env.NODE_ENV !== 'production';

const port = process.env.PORT || 3000;

const app = next({ dev, port });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (
        pathname.startsWith('/_next') ||
        pathname.includes('/api') ||
        pathname.startsWith('/__next')
      ) {
        await handle(req, res, parsedUrl);
      } else if (pathname.includes('.')) {
        const filePath = path.join(__dirname + '/public', pathname);

        fs.readFile(filePath, (err, data) => {
          if (err) throw err;

          res.end(data);
        });
      } else {
        const page = await app.renderToHTML(req, res, pathname, query);

        const { html } = await hydrateDocument(page);

        res.end(
          html ??
            (
              await renderToString(page, {
                staticComponents: true,
              })
            ).html
        );
      }
    } catch (err) {
      console.log(err);
      res.statusCode = 500;
    }
  }).listen(port, () => console.log('App running in http://localhost:' + port));
});
