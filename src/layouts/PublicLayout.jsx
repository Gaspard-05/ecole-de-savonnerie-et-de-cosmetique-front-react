import { Outlet } from "react-router-dom";
import Navbar from "../components/NavbarComponent";
import Footer from "../components/FooterComponent";
import BackToTopButton from "../components/BackToTopButtonComponent";
import WhatsappButton from "../components/WhatsappButtonComponent";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton />
      <WhatsappButton />
    </>
  );
}

export default PublicLayout;
