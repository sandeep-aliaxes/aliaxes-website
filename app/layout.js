import Nav from "../components/Nav";
import VideoBackground from "../components/VideoBackground";
import Footer from "../components/Footer";
import MouseSpotlight from "../components/MouseSpotlight";
import { ProductsTabProvider } from "../components/ProductsTabContext";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProductsTabProvider>
        <MouseSpotlight />
        <VideoBackground />
        <Nav />
        {children}
  </ProductsTabProvider>
        <Footer />
      </body>
    </html>
  );
}