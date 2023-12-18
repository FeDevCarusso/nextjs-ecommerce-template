import Head from "next/head";
import Footer from "./footer";
import Header from "./header";
import AuthProvider, { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Layout({ simpleHeader, hideAuth, children }) {
  const { isChecked } = useContext(AuthContext);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="Best e-commerce app" />
        <link rel="icon" href="/favicon.ico" />
        <title>BasilOrien Mart</title>
      </Head>
      {!isChecked ? null : (
        <div className="d-flex flex-column h-100">
          <Header simple={simpleHeader} hideAuth={hideAuth} />
          <main className="flex-shrink-0">{children}</main>
          <Footer />
        </div>
      )}
    </>
  );
}

function LayoutProvider({ children }) {
  return (
    <AuthProvider>
      <Layout>{children}</Layout>
    </AuthProvider>
  );
}

export default LayoutProvider;
