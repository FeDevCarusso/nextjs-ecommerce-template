import "../styles/bootstrap-custom.css";
import "../styles/globals.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Layout from "../components/layout";
import AuthProvider from "../context/AuthContext";

config.autoAddCss = false;
library.add(fab, fas, far);

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap.bundle.min.js");
}

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout;
  if (getLayout) {
    return getLayout(
      <AuthProvider>{<Component {...pageProps} />}</AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
