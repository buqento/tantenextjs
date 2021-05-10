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
                </body>
            </Html>
        )
    }
}

export default MyDocument