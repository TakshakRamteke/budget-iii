import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) {
    return (
        <>
            <Head>
                <title>Budgetiii</title>
            </Head>
            <main className={`${inter.className} p-3`}>{children}</main>;
        </>
    );
}
