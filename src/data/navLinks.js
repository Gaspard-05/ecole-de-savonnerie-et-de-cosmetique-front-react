// Liens de navigation publique, partagés entre la navbar (desktop) et la
// bottom nav (tablette/mobile) .

import { Home, Info, GraduationCap, Mail } from "lucide-react";

export const navLinks = [
  { to: "/", label: "Accueil", icon: Home },
  { to: "/ecole", label: "À propos", icon: Info },
  { to: "/formations", label: "Formations", icon: GraduationCap },
  { to: "/contact", label: "Contact", icon: Mail },
];
