'use client';

export function ImprovementTrajectory() {

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-center text-slate-900">
        Trajectoire d'Amélioration DORA
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
            <text x="150" y="85" textAnchor="middle" fill="white" fontSize="13">Foundational Challenges</text>
            
            <line x1="150" y1="110" x2="150" y2="160" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)"/>
            <text x="180" y="140" fontSize="12" fill="#333" fontWeight="600">Stabiliser</text>
            
            <rect x="50" y="160" width="200" height="80" rx="10" fill="#ea580c" stroke="#333" strokeWidth="3"/>
            <text x="150" y="190" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">🟠 Cluster 2</text>
            <text x="150" y="215" textAnchor="middle" fill="white" fontSize="13">Legacy Bottleneck</text>
            
            <line x1="150" y1="240" x2="150" y2="290" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)"/>
            <text x="180" y="270" fontSize="12" fill="#333" fontWeight="600">Moderniser</text>
            
            <rect x="50" y="290" width="200" height="80" rx="10" fill="#ca8a04" stroke="#333" strokeWidth="3"/>
            <text x="150" y="320" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">🟡 Cluster 3</text>
            <text x="150" y="345" textAnchor="middle" fill="white" fontSize="13">Constrained by Process</text>
            
            <line x1="150" y1="370" x2="150" y2="550" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)"/>
            <text x="180" y="460" fontSize="12" fill="#333" fontWeight="600">Optimiser</text>
            
            <rect x="350" y="420" width="200" height="80" rx="10" fill="#dc2626" stroke="#333" strokeWidth="3"/>
            <text x="450" y="450" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">🔴 Cluster 4</text>
            <text x="450" y="475" textAnchor="middle" fill="white" fontSize="13">High Impact, Low Cadence</text>
            
            <line x1="420" y1="500" x2="330" y2="810" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)"/>
            <text x="380" y="655" fontSize="12" fill="#333" fontWeight="600">Accélérer</text>
            
            <rect x="50" y="550" width="200" height="80" rx="10" fill="#16a34a" stroke="#333" strokeWidth="3"/>
            <text x="150" y="580" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">🟢 Cluster 5</text>
            <text x="150" y="605" textAnchor="middle" fill="white" fontSize="13">Stable & Methodical</text>
            
            <line x1="220" y1="630" x2="270" y2="810" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)"/>
            <text x="260" y="720" fontSize="12" fill="#333" fontWeight="600">Accélérer</text>
            
            <rect x="200" y="810" width="200" height="80" rx="10" fill="#2563eb" stroke="#333" strokeWidth="3"/>
            <text x="300" y="840" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">🔵 Cluster 6</text>
            <text x="300" y="865" textAnchor="middle" fill="white" fontSize="13">Pragmatic Performers</text>
            
            <line x1="300" y1="890" x2="300" y2="1070" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)"/>
            <text x="330" y="980" fontSize="12" fill="#333" fontWeight="600">Exceller</text>
            
            <rect x="200" y="1070" width="200" height="80" rx="10" fill="#059669" stroke="#333" strokeWidth="3"/>
            <text x="300" y="1100" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">💚 Cluster 7</text>
            <text x="300" y="1125" textAnchor="middle" fill="white" fontSize="13">Harmonious High-Achiever</text>
          </svg>
        </div>
      </div>

      <div className="mt-6 md:mt-8 bg-blue-50 p-4 md:p-5 rounded-lg border-l-4 border-blue-600">
        <h4 className="font-semibold text-blue-900 text-sm mb-2">Comment utiliser cette trajectoire</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Identifiez votre cluster actuel dans le diagnostic</li>
          <li>• Suivez les flèches pour voir le chemin d'amélioration recommandé</li>
          <li>• Concentrez-vous sur une transition à la fois</li>
          <li>• Chaque étape construit sur les fondations précédentes</li>
        </ul>
      </div>
    </div>
  );
}
