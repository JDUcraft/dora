'use client';

import { useTranslation } from "@/hooks/useTranslation";

export function ImprovementTrajectory() {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-center text-slate-900">
        {t('trajectory.title')}
      </h2>

      <div className="overflow-x-auto -mx-2 md:-mx-4">
        <div className="flex justify-center">
          <svg width="600" height="1400" viewBox="0 0 600 1400" className="max-w-full h-auto">
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#333" />
              </marker>
            </defs>
            
            <rect x="50" y="30" width="200" height="80" rx="10" fill="#dc2626" stroke="#333" strokeWidth="3"/>
            <text x="150" y="60" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">🔴 Cluster 1</text>
            <text x="150" y="85" textAnchor="middle" fill="white" fontSize="13">{t('clusters.1.name')}</text>
            
            <line x1="150" y1="110" x2="150" y2="160" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)"/>
            <text x="180" y="140" fontSize="12" fill="#333" fontWeight="600">{t('trajectories.1')}</text>
            
            <rect x="50" y="160" width="200" height="80" rx="10" fill="#ea580c" stroke="#333" strokeWidth="3"/>
            <text x="150" y="190" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">🟠 Cluster 2</text>
            <text x="150" y="215" textAnchor="middle" fill="white" fontSize="13">{t('clusters.2.name')}</text>
            
            <line x1="150" y1="240" x2="150" y2="290" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)"/>
            <text x="180" y="270" fontSize="12" fill="#333" fontWeight="600">{t('trajectories.2')}</text>
            
            <rect x="50" y="290" width="200" height="80" rx="10" fill="#ca8a04" stroke="#333" strokeWidth="3"/>
            <text x="150" y="320" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">🟡 Cluster 3</text>
            <text x="150" y="345" textAnchor="middle" fill="white" fontSize="13">{t('clusters.3.name')}</text>
            
            <line x1="150" y1="370" x2="150" y2="550" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)"/>
            <text x="180" y="460" fontSize="12" fill="#333" fontWeight="600">{t('trajectories.3')}</text>
            
            <rect x="350" y="420" width="200" height="80" rx="10" fill="#dc2626" stroke="#333" strokeWidth="3"/>
            <text x="450" y="450" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">🔴 Cluster 4</text>
            <text x="450" y="475" textAnchor="middle" fill="white" fontSize="13">{t('clusters.4.name')}</text>
            
            <line x1="420" y1="500" x2="330" y2="810" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)"/>
            <text x="380" y="655" fontSize="12" fill="#333" fontWeight="600">{t('trajectories.4')}</text>
            
            <rect x="50" y="550" width="200" height="80" rx="10" fill="#16a34a" stroke="#333" strokeWidth="3"/>
            <text x="150" y="580" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">🟢 Cluster 5</text>
            <text x="150" y="605" textAnchor="middle" fill="white" fontSize="13">{t('clusters.5.name')}</text>
            
            <line x1="190" y1="630" x2="270" y2="810" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)"/>
            <text x="250" y="720" fontSize="12" fill="#333" fontWeight="600">{t('trajectories.5')}</text>
            
            <rect x="200" y="810" width="200" height="80" rx="10" fill="#0284c7" stroke="#333" strokeWidth="3"/>
            <text x="300" y="840" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">🔵 Cluster 6</text>
            <text x="300" y="865" textAnchor="middle" fill="white" fontSize="13">{t('clusters.6.name')}</text>
            
            <line x1="300" y1="890" x2="300" y2="1060" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)"/>
            <text x="330" y="975" fontSize="12" fill="#333" fontWeight="600">{t('trajectories.6')}</text>
            
            <rect x="200" y="1060" width="200" height="80" rx="10" fill="#059669" stroke="#333" strokeWidth="3"/>
            <text x="300" y="1100" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">💚 Cluster 7</text>
            <text x="300" y="1125" textAnchor="middle" fill="white" fontSize="13">{t('clusters.7.name')}</text>
          </svg>
        </div>
      </div>

      <div className="mt-6 md:mt-8 bg-blue-50 p-4 md:p-5 rounded-lg border-l-4 border-blue-600">
        <h4 className="font-semibold text-blue-900 text-sm mb-2">{t('trajectory.howToUse')}</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• {t('trajectory.step1')}</li>
          <li>• {t('trajectory.step2')}</li>
          <li>• {t('trajectory.step3')}</li>
          <li>• {t('trajectory.step4')}</li>
        </ul>
      </div>
    </div>
  );
}
