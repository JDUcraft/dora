import { Cluster } from "@/data/clusters";

interface RadarChartProps {
  cluster: Cluster;
}

export function RadarChart({ cluster }: RadarChartProps) {
  const labelMap: Record<string, string[]> = {
    teamPerformance: ["Team", "performance"],
    productPerformance: ["Product", "performance"],
    softwareDeliveryThroughput: ["Software delivery", "throughput"],
    softwareDeliveryInstability: ["Software delivery", "instability"],
    valuableWork: ["Valuable", "work"],
    friction: ["Friction", ""],
    burnout: ["Burnout", ""],
    individualEffectiveness: ["Individual", "effectiveness"],
  };

  const dimensions = Object.entries(cluster.scores);
  const numDimensions = dimensions.length;
  const angleSlice = (Math.PI * 2) / numDimensions;
  const radius = 120;
  const center = { x: 200, y: 200 };

  const points = dimensions.map((_, i) => ({
    angle: angleSlice * i - Math.PI / 2,
  }));

  const gridCircles = [2, 4, 6, 8];

  const polylinePoints = dimensions
    .map((_, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const value = dimensions[i][1];
      const r = (value / 9) * radius;
      const x = center.x + r * Math.cos(angle);
      const y = center.y + r * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="flex justify-center p-6 bg-slate-50 rounded-lg border border-slate-200">
      <svg width="450" height="450" viewBox="0 0 450 450">
        {gridCircles.map((circle) => (
          <circle
            key={`grid-${circle}`}
            cx={center.x}
            cy={center.y}
            r={(circle / 9) * radius}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
        ))}

        {points.map((_, i) => {
          const angle = angleSlice * i - Math.PI / 2;
          const x1 = center.x;
          const y1 = center.y;
          const x2 = center.x + radius * Math.cos(angle);
          const y2 = center.y + radius * Math.sin(angle);
          return (
            <line
              key={`axis-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#cbd5e1"
              strokeWidth="1"
            />
          );
        })}

        <polygon
          points={polylinePoints}
          fill={cluster.color}
          fillOpacity="0.3"
          stroke={cluster.color}
          strokeWidth="2"
        />

        {dimensions.map(([key, _], i) => {
          const angle = angleSlice * i - Math.PI / 2;
          const x = center.x + (radius + 50) * Math.cos(angle);
          const y = center.y + (radius + 50) * Math.sin(angle);
          const labels = labelMap[key as keyof typeof labelMap];

          return (
            <text
              key={`label-${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              fontSize="14"
              fontWeight="500"
              fill="#475569"
            >
              <tspan x={x} dy="-0.4em">{labels[0]}</tspan>
              {labels[1] && <tspan x={x} dy="1.2em">{labels[1]}</tspan>}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
