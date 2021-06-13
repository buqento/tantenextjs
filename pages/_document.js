import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="manifest" href="/manifest.json" />
                    <link href="/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
                    <link href="/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
                    <link rel="apple-touch-icon" href="/apple-icon.png"></link>
                    <meta name="theme-color" content="#317EFB" />
                    <script data-ad-client="ca-pub-1434074630735871" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script async src="https://cse.google.com/cse.js?cx=d761393c77a5ff02c"></script>
                </body>
            </Html>
        )
    }
}

export default MyDocument