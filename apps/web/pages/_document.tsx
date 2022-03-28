import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import theme from '../utils/theme';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
        </Head>
        <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <div style={{ margin: '50px 100px' }}>
          <Main />
        </div>
        <NextScript />
        </body>
      </Html>
    );
  }
}