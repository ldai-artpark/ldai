import {Head, Html, Main, NextScript} from 'next/document'
import setup from "../setup";

export default function Document() {
    return (
        <Html lang={"en"}>
            <Head>
                <meta name="description" content={setup.projectDescription} />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"true"}/>

                {/* Fred the great  */}
                {/*<link href="https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap"*/}
                {/*      rel="stylesheet" />*/}

                {/* Roboto Slab*/}
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Roboto+Slab:wght@100;300;400;600;700&display=swap"
                    rel="stylesheet" />

                        {/* Google Tag Manager */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-CHHQP1JHRW"></script>
                <script
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-CHHQP1JHRW');
                    `,
                }}
                />
                    
            </Head>
            <body className={" text-zinc-700 dark:text-zinc-200 p-1 min-h-screen"}>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}