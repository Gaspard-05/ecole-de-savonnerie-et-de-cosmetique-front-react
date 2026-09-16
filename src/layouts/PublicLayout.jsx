import { Outlet } from "react-router-dom";
import Navbar from "../components/NavbarComponent";
import Footer from "../components/FooterComponent";
import BackToTopButton from "../components/BackToTopButtonComponent";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton />
    </>
  );
}

export default PublicLayout;
