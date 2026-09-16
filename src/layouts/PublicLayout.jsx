import { Outlet } from "react-router-dom";
import Navbar from "../components/NavbarComponent";
import Footer from "../components/FooterComponent";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default PublicLayout;
