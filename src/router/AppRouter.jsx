import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";

import Accueil from "../pages/Accueil";
import Ecole from "../pages/Ecole";
import Formations from "../pages/Formations";
import FormationDetail from "../pages/FormationDetail";
import Temoignages from "../pages/Temoignages";
import DeposerTemoignage from "../pages/DeposerTemoignage";
import Contact from "../pages/Contact";
import Preinscription from "../pages/Preinscription";
import PreinscriptionSucces from "../pages/PreinscriptionSucces";
import Connexion from "../pages/Connexion";
import VerificationOtp from "../pages/VerificationOtp";
import MentionsLegales from "../pages/MentionsLegales";
import NotFound from "../pages/NotFound";

import Dashboard from "../pages/admin/Dashboard";
import FormationsAdmin from "../pages/admin/FormationsAdmin";
import FormationDetailAdmin from "../pages/admin/FormationDetailAdmin";
import AjouterFormation from "../pages/admin/AjouterFormation";
import ModifierFormation from "../pages/admin/ModifierFormation";
import Prospects from "../pages/admin/Prospects";
import ProspectDetailAdmin from "../pages/admin/ProspectDetailAdmin";
import TelechargementsAdmin from "../pages/admin/TelechargementsAdmin";
import TemoignagesAdmin from "../pages/admin/TemoignagesAdmin";
import TemoignageDetailAdmin from "../pages/admin/TemoignageDetailAdmin";
import AjouterTemoignage from "../pages/admin/AjouterTemoignage";
import Messages from "../pages/admin/Messages";

function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Accueil />} />
          <Route path="/ecole" element={<Ecole />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/formations/:slug" element={<FormationDetail />} />
          <Route path="/temoignages" element={<Temoignages />} />
          <Route path="/temoignages/deposer" element={<DeposerTemoignage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/preinscription" element={<Preinscription />} />
          <Route path="/preinscription/succes" element={<PreinscriptionSucces />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/verification-otp" element={<VerificationOtp />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/formations" element={<FormationsAdmin />} />
          <Route path="/admin/formations/ajouter" element={<AjouterFormation />} />
          <Route path="/admin/formations/:slug/modifier" element={<ModifierFormation />} />
          <Route path="/admin/formations/:slug" element={<FormationDetailAdmin />} />
          <Route path="/admin/telechargements" element={<TelechargementsAdmin />} />
          <Route path="/admin/prospects" element={<Prospects />} />
          <Route path="/admin/prospects/:id" element={<ProspectDetailAdmin />} />
          <Route path="/admin/temoignages" element={<TemoignagesAdmin />} />
          <Route path="/admin/temoignages/ajouter" element={<AjouterTemoignage />} />
          <Route path="/admin/temoignages/:id" element={<TemoignageDetailAdmin />} />
          <Route path="/admin/messages" element={<Messages />} />        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
