import { Users, BookOpen, Wallet, TrendingUp } from "lucide-react";
import KpiCard from "../../components/admin/KpiCardComponent";
import BarChartCard from "../../components/admin/BarChartCardComponent";
import PieChartCard from "../../components/admin/PieChartCardComponent";
import { kpis, inscriptionsParMois, repartitionParFiliere } from "../../data/dashboard";
import "./Dashboard.css";

const KPI_ICONS = {
  prospects: { icon: Users, tone: "primary" },
  formations: { icon: BookOpen, tone: "accent" },
  revenus: { icon: Wallet, tone: "secondary" },
  reussite: { icon: TrendingUp, tone: "accent" },
};

function Dashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Tableau de bord</h1>

      <div className="admin-dashboard__kpis">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            icon={KPI_ICONS[kpi.id].icon}
            tone={KPI_ICONS[kpi.id].tone}
          />
        ))}
      </div>

      <div className="admin-dashboard__charts">
        <BarChartCard title="Évolution des inscriptions sur l'année" data={inscriptionsParMois} />
        <PieChartCard title="Répartition des étudiants par filière" data={repartitionParFiliere} />
      </div>
    </div>
  );
}

export default Dashboard;
