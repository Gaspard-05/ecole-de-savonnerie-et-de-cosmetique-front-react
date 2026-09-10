import "./KpiCard.css";

function KpiCard({ icon: Icon, label, value, tone = "primary" }) {
  return (
    <div className="kpi-card">
      <div className={`kpi-card__badge kpi-card__badge--${tone}`}>
        <Icon size={22} aria-hidden="true" />
      </div>
      <p className="kpi-card__value">{value}</p>
      <p className="kpi-card__label">{label}</p>
    </div>
  );
}

export default KpiCard;
