import "./StatBlock.css";

function StatBlock({ value, label, icon: Icon }) {
  return (
    <div className="stat-block">
      {Icon && <Icon className="stat-block__icon" size={28} aria-hidden="true" />}
      <p className="stat-block__value">{value}</p>
      <p className="stat-block__label">{label}</p>
    </div>
  );
}

export default StatBlock;
