'use client';

import { getAllClusters } from "@/lib/diagnostic";
import { useTranslation } from "@/hooks/useTranslation";

export function PositioningMatrix() {
  const { t } = useTranslation();
  const clusters = getAllClusters();

  const clusterPositions: Record<number, { x: number; y: number }> = {
    1: { x: 0.15, y: 0.15 },
    2: { x: 0.25, y: 0.2 },
    3: { x: 0.5, y: 0.25 },
    4: { x: 0.25, y: 0.6 },
    5: { x: 0.8, y: 0.65 },
    6: { x: 0.85, y: 0.5 },
    7: { x: 0.95, y: 0.95 },
  };

  const width = 800;
  const height = 600;
  const padding = 80;

  const graphWidth = width - 2 * padding;
  const graphHeight = height - 2 * padding;

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-slate-900">
        {t('matrix.title')}
      </h2>

      <div className="w-full">
        <svg 
          width="100%" 
          height="auto"
          viewBox={`0 0 ${width} ${height}`}
          className="border border-slate-200 rounded bg-white"
          preserveAspectRatio="xMidYMid meet"
        >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>

        <rect 
          x={padding} 
          y={padding} 
          width={graphWidth / 2} 
          height={graphHeight / 2} 
          fill="#fef3c7" 
          opacity="0.3" 
        />
        <rect 
          x={padding + graphWidth / 2} 
          y={padding} 
          width={graphWidth / 2} 
          height={graphHeight / 2} 
          fill="#dcfce7" 
          opacity="0.3" 
        />
        <rect 
          x={padding} 
          y={padding + graphHeight / 2} 
          width={graphWidth / 2} 
          height={graphHeight / 2} 
          fill="#fee2e2" 
          opacity="0.3" 
        />
        <rect 
          x={padding + graphWidth / 2} 
          y={padding + graphHeight / 2} 
          width={graphWidth / 2} 
          height={graphHeight / 2} 
          fill="#fef3c7" 
          opacity="0.3" 
        />

        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#000"
          strokeWidth="2"
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="#000"
          strokeWidth="2"
        />

        <line
          x1={padding + graphWidth / 2}
          y1={padding}
          x2={padding + graphWidth / 2}
          y2={height - padding}
          stroke="#666"
          strokeWidth="1"
          strokeDasharray="5,5"
        />
        <line
          x1={padding}
          y1={padding + graphHeight / 2}
          x2={width - padding}
          y2={padding + graphHeight / 2}
          stroke="#666"
          strokeWidth="1"
          strokeDasharray="5,5"
        />

        <text
          x={padding + graphWidth / 4}
          y={padding + graphHeight / 4 - 10}
          textAnchor="middle"
          fontSize="13"
          fontWeight="bold"
          fill="#92400e"
        >
          {t('matrix.q2Title')}
        </text>
        <text
          x={padding + (3 * graphWidth) / 4}
          y={padding + graphHeight / 4}
          textAnchor="middle"
          fontSize="13"
          fontWeight="bold"
          fill="#15803d"
        >
          {t('matrix.q1Title')}
        </text>
        <text
          x={padding + graphWidth / 4}
          y={padding + (3 * graphHeight) / 4}
          textAnchor="middle"
          fontSize="13"
          fontWeight="bold"
          fill="#991b1b"
        >
          {t('matrix.q3Title')}
        </text>
        <text
          x={padding + (3 * graphWidth) / 4}
          y={padding + (3 * graphHeight) / 4}
          textAnchor="middle"
          fontSize="13"
          fontWeight="bold"
          fill="#92400e"
        >
          {t('matrix.q4Title')}
        </text>

        {[0, 0.25, 0.5, 0.75, 1].map((val) => {
          const x = padding + val * graphWidth;
          return (
            <g key={`x-${val}`}>
              <line
                x1={x}
                y1={height - padding + 5}
                x2={x}
                y2={height - padding - 5}
                stroke="#000"
                strokeWidth="1"
              />
              <text
                x={x}
                y={height - padding + 20}
                textAnchor="middle"
                fontSize="12"
                fill="#666"
              >
                {(val * 100).toFixed(0)}%
              </text>
            </g>
          );
        })}

        {[0, 0.25, 0.5, 0.75, 1].map((val) => {
          const y = height - padding - val * graphHeight;
          return (
            <g key={`y-${val}`}>
              <line
                x1={padding - 5}
                y1={y}
                x2={padding + 5}
                y2={y}
                stroke="#000"
                strokeWidth="1"
              />
              <text
                x={padding - 15}
                y={y + 4}
                textAnchor="end"
                fontSize="12"
                fill="#666"
              >
                {(val * 100).toFixed(0)}%
              </text>
            </g>
          );
        })}

        <text
          x={width / 2}
          y={height - 10}
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#333"
        >
          {t('matrix.xAxis')}
        </text>

        <text
          x={20}
          y={height / 2}
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#333"
          transform={`rotate(-90 20 ${height / 2})`}
        >
          {t('matrix.yAxis')}
        </text>

        {clusters.map((cluster) => {
          const pos = clusterPositions[cluster.id];
          const x = padding + pos.x * graphWidth;
          const y = height - padding - pos.y * graphHeight;

          return (
            <g key={cluster.id}>
              <circle
                cx={x}
                cy={y}
                r="30"
                fill={cluster.color}
                opacity="0.9"
                stroke="#000"
                strokeWidth="2"
              />
              <text
                x={x}
                y={y + 6}
                textAnchor="middle"
                fontSize="20"
                fontWeight="bold"
                fill="#fff"
              >
                C{cluster.id}
              </text>
              <title>{cluster.name}</title>
            </g>
          );
        })}
      </svg>
      </div>

      <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <h3 className="font-bold text-yellow-900 mb-2">{t('matrix.q2Title')} 🟡</h3>
          <p className="text-sm text-yellow-800 mb-2">
            <strong>Cluster 4</strong> - {t('matrix.q2Description')}
          </p>
          <p className="text-xs text-yellow-700">
            <strong>{t('matrix.action')}</strong> {t('matrix.q2Action')}
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <h3 className="font-bold text-green-900 mb-2">{t('matrix.q1Title')} 🟢</h3>
          <p className="text-sm text-green-800 mb-2">
            <strong>Clusters 5, 6, 7</strong> - {t('matrix.q1Description')}
          </p>
          <p className="text-xs text-green-700">
            <strong>{t('matrix.action')}</strong> {t('matrix.q1Action')}
          </p>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
          <h3 className="font-bold text-red-900 mb-2">{t('matrix.q3Title')} 🔴</h3>
          <p className="text-sm text-red-800 mb-2">
            <strong>Clusters 1, 2</strong> - {t('matrix.q3Description')}
          </p>
          <p className="text-xs text-red-700">
            <strong>{t('matrix.action')}</strong> {t('matrix.q3Action')}
          </p>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
          <h3 className="font-bold text-amber-900 mb-2">{t('matrix.q4Title')} 🟡</h3>
          <p className="text-sm text-amber-800 mb-2">
            <strong>Cluster 3</strong> - {t('matrix.q4Description')}
          </p>
          <p className="text-xs text-amber-700">
            <strong>{t('matrix.action')}</strong> {t('matrix.q4Action')}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-bold text-lg mb-4">{t('matrix.clusterDetailsTitle')}</h3>
        <div className="space-y-4">
          {clusters.map((cluster) => {
            return (
              <div
                key={cluster.id}
                className="rounded-lg border-2 hover:shadow-md transition-all"
                style={{ borderColor: cluster.color }}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0"
                      style={{ backgroundColor: cluster.color }}
                    >
                      {cluster.id}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-lg">{t(`clusters.${cluster.id}.name`)}</h4>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{t(`clusters.${cluster.id}.description`)}</p>
                      
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="bg-gray-50 p-3 rounded">
                          <h5 className="font-semibold text-xs text-gray-600 mb-2">{t('results.performanceTitle')}</h5>
                          <ul className="space-y-1 text-xs">
                            <li><strong>{t('results.team')}</strong> {cluster.characteristics.teamPerformance}</li>
                            <li><strong>{t('results.product')}</strong> {cluster.characteristics.productPerformance}</li>
                            <li><strong>{t('results.delivery')}</strong> {cluster.characteristics.softwareDelivery}</li>
                          </ul>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded">
                          <h5 className="font-semibold text-xs text-gray-600 mb-2">{t('results.wellbeingTitle')}</h5>
                          <ul className="space-y-1 text-xs">
                            <li><strong>{t('results.burnout')}</strong> {cluster.characteristics.burnout}</li>
                            <li><strong>{t('results.friction')}</strong> {cluster.characteristics.friction}</li>
                            <li><strong>{t('results.stability')}</strong> {cluster.characteristics.systemStability}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
