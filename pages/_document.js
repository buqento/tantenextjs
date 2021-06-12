import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
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