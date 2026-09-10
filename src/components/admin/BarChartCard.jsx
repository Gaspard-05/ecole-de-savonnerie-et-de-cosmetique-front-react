import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./BarChartCard.css";

const BAR_COLOR = "#d99201"; // --color-secondary

function BarChartCard({ title, data }) {
  const maxValue = Math.max(...data.map((d) => d.inscriptions));
  const yMax = Math.ceil((maxValue + 5) / 5) * 5;

  return (
    <div className="admin-chart-card">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--color-border)" />
          <XAxis
            dataKey="mois"
            tickLine={false}
            axisLine={{ stroke: "var(--color-border)" }}
            tick={{ fill: "var(--color-text-muted)", fontSize: 13 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            interval={0}
            ticks={Array.from({ length: yMax / 5 + 1 }, (_, i) => i * 5)}
            tick={{ fill: "var(--color-text-muted)", fontSize: 13 }}
          />
          <Tooltip
            cursor={{ fill: "var(--color-bg-alt)" }}
            contentStyle={{
              borderRadius: 10,
              border: "1px solid var(--color-border)",
              fontFamily: "var(--font-base)",
            }}
          />
          <Bar dataKey="inscriptions" name="Inscriptions" fill={BAR_COLOR} radius={[4, 4, 0, 0]} maxBarSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartCard;
