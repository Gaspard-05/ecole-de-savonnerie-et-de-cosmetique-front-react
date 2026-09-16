import { Outlet } from "react-router-dom";
import Navbar from "../components/NavbarComponent";
import Footer from "../components/FooterComponent";
import BackToTopButton from "../components/BackToTopButtonComponent";
import WhatsappButton from "../components/WhatsappButtonComponent";
import BottomNav from "../components/BottomNavComponent";
import "./PublicLayout.css";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="public-main">
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton />
      <WhatsappButton />
      <BottomNav />
    </>
  );
}

export default PublicLayout;
