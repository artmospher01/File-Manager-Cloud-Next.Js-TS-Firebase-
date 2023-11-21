import Head from "next/head";
import HomePage from "./homePage/homePage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-1 bg-slate-800">
        <HomePage />
      </main>
    </>
  );
}
