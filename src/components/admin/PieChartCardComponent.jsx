import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "./PieChartCard.css";

function PieChartCard({ title, data }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="admin-chart-card">
      <h3>{title}</h3>
      <div className="pie-chart-card__body">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="55%"
              outerRadius="85%"
              paddingAngle={2}
              stroke="var(--color-white)"
              strokeWidth={2}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} étudiants (${Math.round((value / total) * 100)}%)`, name]}
              contentStyle={{
                borderRadius: 10,
                border: "1px solid var(--color-border)",
                fontFamily: "var(--font-base)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <ul className="pie-chart-card__legend">
          {data.map((entry) => (
            <li key={entry.name}>
              <span className="pie-chart-card__swatch" style={{ background: entry.color }} aria-hidden="true" />
              <span className="pie-chart-card__legend-name">{entry.name}</span>
              <span className="pie-chart-card__legend-value">{Math.round((entry.value / total) * 100)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PieChartCard;
