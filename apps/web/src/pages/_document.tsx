import Document, { DocumentContext, DocumentInitialProps } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            <meta name="viewport" content="width=device-width, user-scalable=no" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="manifest" href="/manifest.json" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="anonymous"
            />
            <meta name="viewport" content="width=device-width, user-scalable=no" />
            <link rel="shortcut icon" href="/logo512.png" type="image/x-icon" />
            <title>Space Krypton</title>
            <link
              href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap"
              rel="stylesheet"
            />
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
